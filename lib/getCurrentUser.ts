import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

type TGetCurrentUser = {
  req: GetServerSidePropsContext["req"] | NextApiRequest;
  res: GetServerSidePropsContext["res"] | NextApiResponse;
};

export const getCurrentUser = async ({ req, res }: TGetCurrentUser) => {
  try {
    const session = await getServerSession(req, res, authOptions);

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
