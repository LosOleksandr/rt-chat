import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).send("Not Authorized");
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            userId: session.user.id,
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
