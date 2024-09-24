import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Conversation } from "@prisma/client";
import getSession from "@/lib/getSession";

type TCreateConversationBody = {
  userId: string;
  isGroup: boolean;
  members: { value: string }[];
  name: string;
};

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<{ conversation: Conversation; message: string } | string>
) {
  try {
    const { userId, isGroup, members, name }: TCreateConversationBody =
      req.body;

    const session = await getSession({ req, res });

    if (!session?.user) {
      return res.status(401).send("Not Authorized");
    }

    const isInvalidBody = isGroup && (!members || members.length < 2 || !name);

    if (isInvalidBody) {
      return res.status(400).send("Invalid data");
    }

    if (isGroup) {
      const newGroupConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            create: [
              ...members.map((member: { value: string }) => ({
                user: {
                  connect: { id: member.value },
                },
              })),
              {
                user: {
                  connect: { id: session.user.id },
                },
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return res.status(201).send({
        conversation: newGroupConversation,
        message: "New group conversation was successfully created",
      });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        AND: [
          {
            users: {
              some: {
                user: {
                  id: userId,
                },
              },
            },
          },
          {
            users: {
              some: {
                user: {
                  id: session.user.id,
                },
              },
            },
          },
        ],
      },
    });

    if (existingConversations.length > 0) {
      return res.status(400).send("Conversation is already existed");
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          create: [
            {
              user: {
                connect: { id: session.user.id },
              },
            },
            {
              user: {
                connect: { id: userId },
              },
            },
          ],
        },
      },
    });

    if (!newConversation) {
      return res.status(400).send("Conversation creating failed");
    }

    return res.status(201).send({
      conversation: newConversation,
      message: "Conversation was created successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).send("Internal error");
  }
}
