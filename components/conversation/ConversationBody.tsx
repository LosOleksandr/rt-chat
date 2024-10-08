import { TFullMessage } from "@/types/api";
import React, { useMemo } from "react";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";

type TConversationBody = {
  messages: TFullMessage[];
};

const ConversationBody = ({ messages }: TConversationBody) => {
  const { data: session, status } = useSession();

  const processedMessages = useMemo(() => {
    return messages.map((message) => ({
      ...message,
      isOwn: message.senderId === session?.user.id,
    }));
  }, [messages, session?.user.id]);

  const renderCondition = status !== "loading" && processedMessages.length > 0;

  return (
    <div className="w-full h-screen max-w-6xl py-4 mx-auto flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-4">
        {renderCondition &&
          processedMessages.map((message, i) => (
            <MessageBox
              key={message.id}
              message={message}
              isLast={i === messages.length - 1}
              isOwn={message.isOwn}
            />
          ))}
      </ul>
    </div>
  );
};

export default ConversationBody;
