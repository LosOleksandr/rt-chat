import prisma from "./prisma";

const getConversationById = async (id: string, limit: number) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        users: { include: { user: true } },
      },
    });

    if (!conversation) {
      return null;
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: id },
      include: { seen: true, sender: true },
      orderBy: { createdAt: "asc" },
      take: limit,
    });

    return { ...conversation, messages };
  } catch (error) {
    console.error("Error in getConversationById:", error);
    return null;
  }
};
export default getConversationById;
