import { TSignupCreds } from "@/types/auth";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, password }: TSignupCreds = await req.body;

    const isExist = await prisma.user.findUnique({ where: { email } });

    if (!isExist) {
      res.status(409).send({ message: "User is already exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).send({ message: "Signup successful" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}
