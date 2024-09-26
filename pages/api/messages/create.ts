import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";
import uploadToCloudinary from "@/lib/uploadToCloundinary";

type TCreateMessageBody = {
  message: string;
  image: string;
  conversationId: string;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req, res });

    if (!session?.user.id) {
      return res.status(401).send("Not Authtorized");
    }

    const { message, image, conversationId }: TCreateMessageBody = req.body;
    let uploadedImageUrl = null;

    if (image) {
      const uploadParams = {
        filePath: image,
        folder: "users_messages",
        senderId: session.user.id,
      };

      const result = await uploadToCloudinary(uploadParams);
      uploadedImageUrl = result.url;
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        conversationId,
        senderId: session.user.id,
        image: uploadedImageUrl,
        seen: {
          create: {
            user: {
              connect: {
                id: session.user.id,
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
