import { User } from "@prisma/client";
import prisma from "./prisma";

export const getCurrentUser = async (id: string): Promise<User | null> => {
  try {
    const currentUser = await prisma.user.findUnique({ where: { id } });

    if (!currentUser) {
      return null;
    }
    return JSON.parse(JSON.stringify(currentUser));
  } catch (error) {
    console.error("Error in getUser:", error);
    return null;
  }
};
