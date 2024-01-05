import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import SpotifyProvider from "next-auth/providers/spotify";
import ENV from "@/config/env";

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
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await client.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Email or password is invalid");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Email or password is invalid");
        }

        return user;
      },
    }),
    GithubProvider({
      clientId: ENV.PROVIDERS.GITHUB_CLIENT_ID,
      clientSecret: ENV.PROVIDERS.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: ENV.PROVIDERS.GOOGLE_CLIENT_ID,
      clientSecret: ENV.PROVIDERS.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    DiscordProvider({
      clientId: ENV.PROVIDERS.DISCORD_CLIENT_ID,
      clientSecret: ENV.PROVIDERS.DISCORD_CLIENT_SECRET,
    }),
    SpotifyProvider({
      clientId: ENV.PROVIDERS.SPOTIFY_CLIENT_ID,
      clientSecret: ENV.PROVIDERS.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  secret: ENV.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
