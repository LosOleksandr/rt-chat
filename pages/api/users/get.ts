import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req, res });

    if (!session?.user) {
      return res.status(401).send("Not Authorized");
    }

    console.time("get users");
    const users = await prisma.user.findMany({
      where: { NOT: { email: session.user.email } },
      orderBy: { createdAt: "desc" },
      omit: {
        password: true,
      },
    });

    console.timeEnd("get users");
    // const userConversations = await Promise.all(
    //   users.map(async (user) => {
    //     const conversation = await prisma.conversation.findMany({
    //       where: {
    //         AND: [
    //           {
    //             users: {
    //               some: {
    //                 user: {
    //                   id: user.id,
    //                 },
    //               },
    //             },
    //           },
    //           {
    //             users: {
    //               some: {
    //                 user: {
    //                   id: session.user.id,
    //                 },
    //               },
    //             },
    //           },
    //         ],
    //       },
    //       select: {
    //         id: true,
    //       },
    //     });
    //     return { ...user, conversationExists: conversation[0]?.id };
    //   })
    // );

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send("Internal error");
  }
}
