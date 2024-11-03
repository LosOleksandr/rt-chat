import React, { useCallback, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";
import EmptyState from "../EmptyState";
import useScroll from "@/hooks/useScroll";
import { Button } from "../ui/button";
import { IconArrowBarToDown } from "@tabler/icons-react";
import { TFullConversation, TFullMessage } from "@/types/api";
import { pusherClient } from "@/lib/pusher-client";
import { useSWRConfig } from "swr";
import useConversations from "@/hooks/useConversations";
import instance from "@/lib/instance";

type TConversationBody = {
  messages: TFullMessage[];
};

const ConversationBody = ({ messages }: TConversationBody) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const { conversationId } = useConversations();
  const {
    ref: messageContainerRef,
    scrollToBottom,
    showScrollToBottom,
  } = useScroll<HTMLDivElement>();

  const processedMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        isOwn: message.senderId === session?.user.id,
      })),
    [messages, session?.user.id]
  );

  const updatedSeenMessages = useCallback(async () => {
    try {
      await instance.post(`/api/conversations/${conversationId}/seen`, {
        conversationId,
      });
    } catch (error) {
      console.error("Failed to mark messages as seen:", error);
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [processedMessages, scrollToBottom]);

  useEffect(() => {
    updatedSeenMessages();
  }, [updatedSeenMessages]);

  useEffect(() => {
    if (conversationId) {
      pusherClient.subscribe(conversationId);

      const updateMessages = (
        prevMessages: TFullMessage[],
        newMessage: TFullMessage
      ) =>
        prevMessages.some((m) => m.id === newMessage.id)
          ? prevMessages
          : [...prevMessages, newMessage];

      const addMessage = async (message: TFullMessage) => {
        mutate(
          `/api/conversations/${conversationId}`,
          (prev: TFullConversation | undefined) => {
            if (!prev) return prev;
            return {
              ...prev,
              messages: updateMessages(prev.messages, message),
            };
          },
          { revalidate: false }
        );

        await updatedSeenMessages();
      };

      const markMessagesAsSeen = (seenMessages: TFullMessage[]) => {
        mutate(
          `/api/conversations/${conversationId}`,
          (prev: TFullConversation | undefined) => {
            if (!prev) return prev;

            const messages = prev.messages.map(
              (message) =>
                seenMessages.find((m) => m.id === message.id) || message
            );

            return { ...prev, messages };
          }
        );
      };

      pusherClient.bind("messages:new", addMessage);
      pusherClient.bind("message:seen", markMessagesAsSeen);

      return () => {
        pusherClient.unbind("messages:new", addMessage);
        pusherClient.unbind("message:seen", markMessagesAsSeen);
        pusherClient.unsubscribe(conversationId);
      };
    }
  }, [conversationId, mutate, updatedSeenMessages]);

  return (
    <div className="min-h-0 max-h-full h-full w-full max-w-6xl mx-auto sm:py-4 py-2 relative">
      <div
        className="h-full overflow-y-auto scrollbar-hidden sm:custom-scrollbar-transparent sm:hover:custom-scrollbar"
        ref={messageContainerRef}
      >
        {messages.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {processedMessages.map((message, i) => (
              <MessageBox
                key={message.id}
                message={message}
                isLast={i === messages.length - 1}
                isOwn={message.isOwn}
              />
            ))}
          </ul>
        ) : (
          <EmptyState>No messages here yet</EmptyState>
        )}
      </div>
      <ScrollToBottomButton
        onClick={() => scrollToBottom("smooth")}
        isVisible={showScrollToBottom}
      />
    </div>
  );
};

const ScrollToBottomButton = ({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={`${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-10 scale-0"
    } absolute left-1/2 -translate-x-1/2 w-9 h-9 bottom-4 p-2 drop-shadow-xl shadow-black bg-black/40 hover:bg-black/50 dark:bg-black/75 dark:hover:bg-black/60 hover:text-primary-foreground text-primary-foreground dark:text-primary rounded-full transition-all`}
  >
    <IconArrowBarToDown />
  </Button>
);

export default ConversationBody;
