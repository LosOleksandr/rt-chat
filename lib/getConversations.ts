import prisma from "./prisma";

const getConversations = async (id: string) => {
  const conversations = await prisma.conversationOnUser.findMany({
    where: {
      user: {
        id,
      },
    },
    include: {
      conversation: true,
      user: true,
    },
  });

  return conversations;
};

export default getConversations;
