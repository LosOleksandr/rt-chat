import React from "react";
import ConversationBox from "./ConversationBox";
import useConversations from "@/hooks/useConversations";
import { TFullConversation } from "@/types/api";
import useSWR, { SWRResponse } from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "../ui/skeleton";

const ConversationList = () => {
  const { conversationId } = useConversations();
  const { data: conversations, isLoading }: SWRResponse<TFullConversation[]> =
    useSWR("/api/conversations/get", fetcher);

  if (isLoading) return <Loading number={5} />;

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

const Loading = ({ number }: { number: number }) => {
  return (
    <ul className="flex flex-col gap-1 mt-4 overflow-auto">
      {Array.from({ length: number }).map((_, index) => (
        <li key={index} className="flex items-center gap-4 p-2 justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-28 h-2" />
              <Skeleton className="w-20 h-2" />
            </div>
          </div>
          <Skeleton className="w-14 h-3" />
        </li>
      ))}
    </ul>
  );
};

export default ConversationList;
