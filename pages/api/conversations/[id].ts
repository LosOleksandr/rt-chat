import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req, res });

    if (!session?.user) {
      return res.status(401).send("Not Authorized");
    }

    const conversationId = Array.isArray(req.query.id)
      ? req.query.id[0]
      : req.query.id;

    if (!conversationId) return res.status(404).send("Bad Request");

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: { include: { user: true } },
      },
    });

    if (!conversation) {
      return null;
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { seen: true, sender: true },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).send({ ...conversation, messages });
  } catch (error) {
    return res.status(500).send("Internal error");
  }
}
