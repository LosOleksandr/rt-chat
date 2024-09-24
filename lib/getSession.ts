import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TServerSessionContext } from "@/types/auth";
import { getServerSession } from "next-auth";

const getSession = async ({ req, res }: TServerSessionContext) => {
  return await getServerSession(req, res, authOptions);
};

export default getSession;
