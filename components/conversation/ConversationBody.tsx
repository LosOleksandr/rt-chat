import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";
import EmptyState from "../EmptyState";
import useScroll from "@/hooks/useScroll";
import { Button } from "../ui/button";
import { IconArrowBarToDown } from "@tabler/icons-react";
import { TFullMessage } from "@/types/api";
import axios from "axios";
import { useParams } from "next/navigation";

type TConversationBody = {
  messages: TFullMessage[];
};

const ConversationBody = ({ messages }: TConversationBody) => {
  const { data: session, status } = useSession();
  const params = useParams();

  const conversationId = params.conversation_id;

  const processedMessages = useMemo(() => {
    return messages.map((message) => ({
      ...message,
      isOwn: message.senderId === session?.user.id,
    }));
  }, [messages, session?.user.id]);

  const {
    ref: messageContainerRef,
    scrollToBottom,
    showScrollToBottom,
  } = useScroll<HTMLDivElement>();

  useEffect(() => {
    scrollToBottom();
  }, [processedMessages, scrollToBottom]);

  useEffect(() => {
    axios
      .post(`/api/conversations/${conversationId}/seen`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }, [conversationId, messages]);

  return (
    <div className="min-h-0 max-h-full h-full w-full max-w-6xl mx-auto sm:py-4 py-2 relative">
      <div
        className="h-full overflow-y-auto scrollbar-hidden sm:custom-scrollbar-transparent sm:hover:custom-scrollbar"
        ref={messageContainerRef}
      >
        {messages.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {status !== "loading" &&
              processedMessages.map((message, i) => (
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
      <Button
        variant={"ghost"}
        onClick={() => scrollToBottom("smooth")}
        className={`${
          showScrollToBottom
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 scale-0"
        }  absolute left-1/2 -translate-x-1/2 w-9 h-9 bottom-4 p-2 drop-shadow-xl shadow-black bg-black/40 hover:bg-black/50 dark:bg-black/75 dark:hover:bg-black/60 
          hover:text-primary-foreground text-primary-foreground dark:text-primary rounded-full transition-all`}
      >
        <IconArrowBarToDown />
      </Button>
    </div>
  );
};

export default ConversationBody;
