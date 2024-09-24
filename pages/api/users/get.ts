import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req, res });

    if (!session?.user) {
      return res.status(401).send("Not Authorized");
    }

    const users = await prisma.user.findMany({
      where: { NOT: { email: session.user.email } },
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
