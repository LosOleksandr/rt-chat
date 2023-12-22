import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("GitHub client ID or client secret is not defined.");
}

const client = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await client.user.findUnique({
          where: { email: credentials?.email },
        });

        const isMatch = bcrypt.compareSync(
          credentials?.password as string,
          user?.password as string
        );
        if (user && isMatch) {
          return user;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {},
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signup",
  },
};

export default NextAuth(authOptions);
