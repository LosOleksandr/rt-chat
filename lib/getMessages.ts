import prisma from "./prisma";

const getMessagesByConversationId = async (id: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: id,
      },
      include: {
        seen: true,
        sender: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.error("Error in getMessages:", error);
    return [];
  }
};

export default getMessagesByConversationId;
