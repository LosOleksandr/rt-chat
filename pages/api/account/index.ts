import { TAccountCreds } from "@/types/account";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, phone, description }: TAccountCreds = await req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).send({ message: "Unexpected error" });
    }

    await prisma.user.update({
      where: { email: email },
      data: {
        name,
        email,
        phone,
        description,
      },
    });

    res.status(200).send({ message: "Signup successful" });
  } catch (error) {
    res.status(500).send({ error: "Unexpected Server Error" });
  }
}
