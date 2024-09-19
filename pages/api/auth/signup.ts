import { TSignupCreds } from "@/types/auth";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, password }: TSignupCreds = await req.body;
    const isExist = await prisma.user.findUnique({ where: { email } });
    console.log('isExist: ', isExist);

    if (isExist) {
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
    res.status(500).send({ error: "Unexpected Server Error" });
  }
}
