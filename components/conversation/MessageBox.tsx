import { TFullMessage } from "@/types/api";
import React, { useMemo } from "react";
import UserAvatar from "../sidebar/UserAvatar";
import formatMessageDate from "@/lib/utils/formatMessageDate";

import ImageMessageBox from "./ImageMessageBox";
import { IconCheck, IconChecks } from "@tabler/icons-react";

type TMessageBox = {
  message: TFullMessage;
  isLast: boolean;
  isOwn: boolean;
};

const MessageBox = ({ message, isOwn }: TMessageBox) => {
  const seenList = useMemo(() => {
    return (message.seen || [])
      .filter((user) => user.id === message.senderId)
      .map((user) => user.name)
      .join(", ");
  }, [message.seen, message.senderId]);

  const messageDate = useMemo(() => {
    return formatMessageDate(new Date(message.createdAt));
  }, [message.createdAt]);

  return (
    <li
      className={`flex ${
        isOwn
          ? "flex-row-reverse ml-auto text-primary-foreground dark:text-primary"
          : "flex-row"
      } items-start gap-2 md:text-sm text-md`}
    >
      <UserAvatar src={message.sender.image} alt={message.sender.name} />
      <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} `}>
        {message.image ? (
          <ImageMessageBox
            src={message.image}
            alt={message.senderId}
            body={message.body}
            date={messageDate}
            isSeen={seenList.length > 0}
            isOwn={isOwn}
          />
        ) : (
          <>
            <p className="text-xs mb-1">{messageDate}</p>
            <p
              className={`${
                isOwn ? "bg-accent" : "bg-background-secondary"
              } px-2 py-1 rounded-xl flex justify-between gap-2`}
            >
              {message.body}
              <span className="mt-auto">
                {seenList.length > 0 ? (
                  <IconChecks className="w-4 h-4" />
                ) : (
                  <IconCheck className="w-4 h-4" />
                )}
              </span>
            </p>
          </>
        )}
      </div>
    </li>
  );
};

export default MessageBox;
