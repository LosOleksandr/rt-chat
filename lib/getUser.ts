import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw new Error("Failed to fetch user");
  }
};
