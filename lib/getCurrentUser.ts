import prisma from "./prisma";
import { TServerSessionContext } from "@/types/auth";
import getSession from "./getSession";

export const getCurrentUser = async ({ req, res }: TServerSessionContext) => {
  try {
    const session = await getSession({ req, res });

    if (!session?.user) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: { id: session.user.id },
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
