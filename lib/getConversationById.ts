import prisma from "./prisma";

const getConversationById = async (id: string) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: { users: { include: { user: true } } },
    });

    if (!conversation) {
      return null;
    }

    return conversation;
  } catch (error) {
    console.error("Error in getConversationById:", error);
    return null;
  }
};
export default getConversationById;
