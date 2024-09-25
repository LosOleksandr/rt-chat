import React from "react";
import ConversationBox from "./ConversationBox";
import useConversations from "@/hooks/useConversations";
import { TFullConversation } from "@/types/api";
import useSWR, { SWRResponse } from "swr";
import fetcher from "@/lib/fetcher";

const ConversationList = () => {
  const { conversationId } = useConversations();
  const { data: conversations, isLoading }: SWRResponse<TFullConversation[]> =
    useSWR("/api/conversations/get", fetcher);

  if (isLoading) return <Loading />;

  return (
    <ul className="flex flex-col gap-1 mt-4 overflow-auto">
      {conversations
        ? conversations.map(({ id, ...props }) => (
            <ConversationBox
              key={id}
              id={id}
              active={id === conversationId}
              {...props}
            />
          ))
        : null}
    </ul>
  );
};

const Loading = () => {
  return <div>Loading</div>;
};

export default ConversationList;
