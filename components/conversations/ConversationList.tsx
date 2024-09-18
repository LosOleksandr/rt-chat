import instance from "@/lib/instance";
import React, { useCallback, useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";
import useConversations from "@/hooks/useConversations";
import { TFullConversation } from "@/types/api";

const ConversationList = () => {
  const [conversations, setConversations] = useState<TFullConversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { conversationId } = useConversations();

  const fetchConversations = useCallback(() => {
    setIsLoading(true);
    instance
      .get("/conversations/get")
      .then(({ data }) => setConversations(data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (isLoading) return <Loading />;

  return (
    <ul className="flex flex-col gap-1 mt-4 overflow-auto">
      {conversations.length > 0
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
