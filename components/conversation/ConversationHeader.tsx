import React, { useMemo } from "react";
import UserAvatar from "../sidebar/UserAvatar";
import { TFullConversation } from "@/types/api";
import useOtherUser from "@/hooks/useOtherUser";

const ConversationHeader = ({
  conversation,
}: {
  conversation: TFullConversation;
}) => {
  const otherUser = useOtherUser(conversation?.users);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation.isGroup, conversation.users.length]);

  return (
    <header className="border-b border-border max-h-14 flex items-end gap-2 p-2 bg-background-secondary">
      <UserAvatar
        src={otherUser?.image || ""}
        alt={otherUser?.name || "Deleted Account"}
      />
      <div className="flex flex-col justify-end">
        <p>{otherUser?.name || "Deleted Account"}</p>
        <small className="text-muted">{statusText}</small>
      </div>
    </header>
  );
};

export default ConversationHeader;
