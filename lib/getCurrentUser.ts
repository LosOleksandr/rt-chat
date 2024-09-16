import prisma from "./prisma";

export const getCurrentUser = async (id: string) => {
  try {
    const currentUser = await prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: { id },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};
