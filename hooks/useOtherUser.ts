import { TFullConversationOnUser } from "@/types/api";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (users: TFullConversationOnUser[]) => {
  const { data: session } = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user.email;

    const otherUser = users?.filter(
      ({ user }) => user.email !== currentUserEmail
    );

    if (otherUser?.length === 0) {
      return null;
    }

    return otherUser?.[0].user;
  }, [session?.user.email, users]);

  return otherUser;
};

export default useOtherUser;
