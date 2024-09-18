import { TFullConversationOnUser } from "@/types/api";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (users: TFullConversationOnUser[]) => {
  const { data: session } = useSession();

  const otheUser = useMemo(() => {
    const currentUserEmail = session?.user.email;

    const otherUser = users.filter(
      ({ user }) => user.email !== currentUserEmail
    );

    return otherUser;
  }, [session?.user.email, users]);

  return otheUser[0].user;
};

export default useOtherUser;
