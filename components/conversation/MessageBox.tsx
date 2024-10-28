import { TFullMessage } from "@/types/api";
import React, { useMemo } from "react";
import UserAvatar from "../sidebar/UserAvatar";
import formatMessageDate from "@/lib/utils/formatMessageDate";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

type TMessageBox = {
  message: TFullMessage;
  isLast: boolean;
  isOwn: boolean;
};

const MessageBox = ({ message, isOwn }: TMessageBox) => {
  const { data: session } = useSession();

  const seenList = useMemo(() => {
    return (message.seen || [])
      .filter(({ userId }) => userId !== message.senderId)
      .map((seen) => seen.user.name);
  }, [message.seen, message.senderId]);

  const isMessageSeen = useMemo(() => {
    return (message.seen || []).some(
      (seen) => seen.userId !== message.senderId
    );
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
          {isMessageSeen ? (
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
        {seenList.length > 1 &&
          !seenList.includes(session?.user.name || "") && (
            <small className="text-muted">seen by {seenList}</small>
          )}
      </div>
    </li>
  );
};

export default MessageBox;
