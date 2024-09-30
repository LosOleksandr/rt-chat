import { TFullMessage } from "@/types/api";
import React from "react";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";

type TConversationBody = {
  messages: TFullMessage[];
};

const ConversationBody = ({ messages }: TConversationBody) => {
  const { data: session } = useSession();

  return (
    <div className="w-full max-w-6xl py-4 mx-auto flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-4">
        {messages.length > 0 &&
          messages.map((message, i) => (
            <MessageBox
              key={message.id}
              message={message}
              isLast={i === messages.length - 1}
              isOwn={message.senderId === session?.user.id}
            />
          ))}
      </ul>
    </div>
  );
};

export default ConversationBody;
