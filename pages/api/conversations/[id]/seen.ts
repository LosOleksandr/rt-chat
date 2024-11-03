import { MessageSeen, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";
import { NextApiRequest, NextApiResponse } from "next";
import { pusher } from "@/lib/pusher";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req, res });

    if (!session?.user.id) {
      return res.status(401).send("Unauthorized");
    }

    const { conversationId } = req.body;

    if (!conversationId) {
      return res.status(400).send("Bad request. Invalid id");
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: { include: { seen: true } }, users: true },
    });

    if (!conversation) {
      return res
        .status(404)
        .send("Not found. Conversation with this id doesn't exist");
    }

    const query = Prisma.sql`
      INSERT INTO "MessageSeen" ("messageId", "userId")
      SELECT 
        m.id,
        $1
      FROM "Message" m
      LEFT JOIN "MessageSeen" ms ON 
        ms."messageId" = m.id AND 
        ms."userId" = $1
      WHERE 
        m."conversationId" = $2
        AND m."senderId" != $1
        AND ms."messageId" IS NULL
      ON CONFLICT ("messageId", "userId") DO NOTHING
      RETURNING "messageId", "userId";
    `;

    // @ts-expect-error read-only property error
    query.values = [session.user.id, conversationId];

    const insertedMessageIds: MessageSeen[] = await prisma.$queryRaw(query);

    const updatedMessages = await prisma.message.findMany({
      where: {
        id: {
          in: insertedMessageIds.map((record) => record.messageId),
        },
      },
      include: {
        seen: {
          include: {
            user: true,
          },
        },
        sender: true,
      },
    });

    const lastUpdatedMessage = updatedMessages[updatedMessages.length - 1];

    try {
      const pusherPromises = [
        pusher.trigger(conversationId, "message:seen", updatedMessages),
        ...conversation.users.map((user) =>
          pusher.trigger(user.userId, "conversation:update", {
            id: conversationId,
            message: lastUpdatedMessage,
          })
        ),
      ];

      await Promise.all(pusherPromises);
    } catch (error) {
      console.error("Pusher notification error:", error);
    }

    return res.status(201).send(updatedMessages);
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).send("Internal server error");
  }
}
