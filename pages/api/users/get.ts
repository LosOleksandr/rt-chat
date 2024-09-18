import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const currentUser = await getCurrentUser({ req, res });

    if (!currentUser) {
      return res.status(401).send("Not Authorized");
    }

    const users = await prisma.user.findMany({
      where: { NOT: { email: currentUser.email } },
      orderBy: { createdAt: "desc" },
      omit: {
        password: true,
      },
    });

    if (!users) {
      return res.status(404).send("Users not found");
    }

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send("Internal error");
  }
}
