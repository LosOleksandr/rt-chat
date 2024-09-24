import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";

type TCreateMessageBody = {
  message: string;
  image: string;
  conversationId: string;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req, res });

    if (!session?.user) {
      return res.status(401).send("Not Authtorized");
    }

    const { message, image, conversationId }: TCreateMessageBody = req.body;

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversationId,
        senderId: "cm1exm2g90000bzljugq2vr34",
        seen: {
          create: {
            user: {
              connect: {
                id: "cm1exm2g90000bzljugq2vr34",
              },
            },
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    return res.status(201).send(newMessage);
  } catch (error) {}
}
