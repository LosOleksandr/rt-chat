import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";
import { pusher } from "@/lib/pusher";
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
      return res.status(401).send("Not Authorized");
    }

    const { message, image, conversationId }: TCreateMessageBody = req.body;
    let uploadedImageUrl = null;

    if (image) {
      try {
        const result = await uploadToCloudinary({
          filePath: image,
          folder: "users_messages",
          senderId: session.user.id,
        });
        uploadedImageUrl = result.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        return res.status(500).send("Image upload failed");
      }
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        conversationId,
        senderId: session.user.id,
        image: uploadedImageUrl,
        seen: {
          create: {
            userId: session.user.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessagesAt: new Date() },
      include: {
        users: {
          select: { userId: true },
        },
      },
    });

    try {
      const pusherPromises = [
        pusher.trigger(conversationId, "messages:new", newMessage),
        ...updatedConversation.users.map((user) =>
          pusher.trigger(user.userId, "conversation:update", {
            id: updatedConversation.id,
            message: newMessage,
          })
        ),
      ];

      await Promise.all(pusherPromises);
    } catch (error) {
      console.error("Pusher notification error:", error);
    }

    return res.status(201).send(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).send("Internal server error");
  }
}
