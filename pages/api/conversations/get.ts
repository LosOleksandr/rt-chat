import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const currentUser = await getCurrentUser({ res, req });

    if (!currentUser) {
      return res.status(401).send("Not Authorized");
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            userId: currentUser.id,
          },
        },
      },
      include: {
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    return res.status(200).send(conversations);
  } catch (error) {}
}
