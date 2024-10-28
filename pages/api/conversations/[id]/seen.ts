import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req, res });

    if (!session?.user.id) {
      return res.status(401).send("Unauthorized");
    }

    const conversationId = Array.isArray(req.query.id)
      ? req.query.id[0]
      : req.query.id;

    if (!conversationId) {
      return res.status(400).send("Bad request. Invalid id");
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });

    if (!conversation) {
      return res
        .status(404)
        .send("Not found. Conversation with this id doesn't exist");
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        NOT: {
          seen: {
            some: {
              userId: session.user.id,
            },
          },
        },
      },
    });

    if (!messages) {
      return res.status(200).send(conversation);
    }

    const updatePromises = messages.map((message) =>
      prisma.messageSeen.create({
        data: {
          messageId: message.id,
          userId: session.user.id!,
        },
      })
    );

    await Promise.all(updatePromises);

    return res.status(201).send(updatePromises);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
}
