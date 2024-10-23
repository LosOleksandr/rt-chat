import { TFullMessage } from "@/types/api";
import React, { useMemo } from "react";
import UserAvatar from "../sidebar/UserAvatar";
import formatMessageDate from "@/lib/utils/formatMessageDate";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import Image from "next/image";

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
        isOwn ? "flex-row-reverse ml-auto text-primary" : "flex-row "
      } items-start gap-2 md:text-sm text-md max-w-full px-4 xs:max-w-sm sm:max-w-md`}
    >
      <UserAvatar src={message.sender.image} alt={message.sender.name} />
      <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
        <div
          className={`flex gap-1 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
        >
          <p className="text-xs mb-1">{messageDate}</p>
          {seenList.length > 0 ? (
            <IconChecks className="w-4 h-4" />
          ) : (
            <IconCheck className="w-4 h-4" />
          )}
        </div>
        {message.image ? (
          <div
            className={`${
              isOwn
                ? "bg-accent text-primary-foreground dark:text-primary"
                : "bg-background-secondary"
            } p-1 relative rounded-lg`}
          >
            <Image
              src={message.image}
              width={200}
              height={200}
              alt={message.sender.name || ""}
              style={{ borderRadius: "10px" }}
            />
            {message.body && (
              <p className="mt-2 ml-1 inline-block break-all max-w-[200px] items-center justify-between gap-2">
                {message.body}
              </p>
            )}
          </div>
        ) : (
          <div
            className={`${
              isOwn
                ? "bg-accent text-primary-foreground dark:text-primary"
                : "bg-background-secondary"
            } px-2 py-1 rounded-lg`}
          >
            <p className={`break-all`}>{message.body}</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default MessageBox;
