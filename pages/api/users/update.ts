import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

type TApiUserUpdate =
  | {
      data: {
        user: {
          name: string | null;
          email: string | null;
          image?: string | null;
          phone?: string | null;
          description?: string | null;
        };
        message: string;
      };
    }
  | { error: unknown };

export default async function PUT(
  req: NextApiRequest,
  res: NextApiResponse<TApiUserUpdate>
) {
  try {
    const token = await getToken({ req });

    if (!token) {
      res.status(401).send({ error: "Not authorized" });
    }

    const { name, email, phone, description } = await req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).send({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        name,
        email,
        phone,
        description,
      },
      select: {
        name: true,
        email: true,
        image: true,
        phone: true,
        description: true,
      },
    });

    res.status(201).send({
      data: {
        user: updatedUser,
        message: "Credentials was successfully updated",
      },
    });
  } catch (error) {
    console.error("Error in user update: ", error);
    res.status(500).send({
      error,
    });
  }
}
