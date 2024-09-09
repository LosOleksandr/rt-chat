import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      phone: string | undefined;
      description: string | undefined;
    } & DefaultSession["user"];
  }
}
