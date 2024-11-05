import React, { useEffect } from "react";
import ConversationBox from "./ConversationBox";
import useConversations from "@/hooks/useConversations";
import { TFullConversation, TFullMessage } from "@/types/api";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "../ui/skeleton";
import { pusherClient } from "@/lib/pusher-client";
import { useSession } from "next-auth/react";

const ConversationList = () => {
  const { conversationId } = useConversations();
  const { data: session } = useSession();
  const {
    data: conversations,
    isLoading,
    mutate,
  } = useSWR("/api/conversations/get", fetcher<TFullConversation[]>);

  useEffect(() => {
    if (session?.user.id) {
      const userId = session.user.id;
      pusherClient.subscribe(userId);

      const updateConversations = (
        prevConversations: TFullConversation[],
        updatedConversation: { id: string; message: TFullMessage }
      ) => {
        const { message, id } = updatedConversation;

        return prevConversations.map((conversation) => {
          if (conversation.id !== id || !message) return conversation;

          const existingMessageIndex = conversation.messages.findIndex(
            (msg) => msg.id === message.id
          );

          if (existingMessageIndex > -1) {
            const updatedMessages = [...conversation.messages];
            updatedMessages[existingMessageIndex] = {
              ...updatedMessages[existingMessageIndex],
              seen: [...message.seen],
            };
            return {
              ...conversation,
              messages: updatedMessages,
            };
          } else {
            return {
              ...conversation,
              messages: [...conversation.messages, message],
            };
          }
        });
      };

      const conversationsUpdateHandler = (updatedConversation: {
        id: string;
        message: TFullMessage;
      }) => {
        mutate((prev: TFullConversation[] | undefined) => {
          if (!prev) return prev;

          return updateConversations(prev, updatedConversation);
        });
      };

      pusherClient.bind("conversation:update", conversationsUpdateHandler);

      return () => {
        pusherClient.unbind("conversation:update", conversationsUpdateHandler);
        pusherClient.unsubscribe(userId);
      };
    }
  }, [mutate, session?.user.id]);

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
    <ul className="flex-col gap-1 mt-4 overflow-auto hidden sm:flex">
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
