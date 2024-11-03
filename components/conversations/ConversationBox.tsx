import useOtherUser from "@/hooks/useOtherUser";
import { TFullConversation } from "@/types/api";
import React, { useMemo } from "react";
import UserAvatar from "../sidebar/UserAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import formatMessageDate from "@/lib/utils/formatMessageDate";

type TConversationBox = TFullConversation & {
  active?: boolean;
};

const ConversationBox = ({
  active,
  users,
  id,
  messages,
  name,
  createdAt,
}: TConversationBox) => {
  const otherUser = useOtherUser(users);
  const { data: session } = useSession();

  const conversationsHref = useMemo(() => {
    return `/conversations/${id}`;
  }, [id]);

  const lastMessage = useMemo(() => {
    return messages[messages.length - 1];
  }, [messages]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArr = lastMessage.seen || [];

    return (
      seenArr.filter((seen) => seen.userId === session?.user.id).length === 0
    );
  }, [lastMessage, session?.user.id]);

  const unseenMessagesCount = useMemo(() => {
    return messages.filter((message) => {
      return !message.seen.some((seen) => seen.userId === session?.user.id);
    }).length;
  }, [messages, session?.user.id]);

  const lastMessageBody = useMemo(() => {
    if (lastMessage?.image) {
      return `${otherUser?.name} sent an image`;
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage?.body, lastMessage?.image, otherUser?.name]);

  return (
    <li
      className={`${
        active
          ? "bg-accent hover:bg-accent dark:hover:bg-accent text-primary-foreground dark:text-primary"
          : "hover:bg-slate-100/90 dark:hover:bg-neutral-500/90"
      } group rounded-md transition-colors`}
    >
      <Link
        href={conversationsHref}
        className="flex  justify-between gap-4 p-2 max-w-full w-full"
      >
        <div className="flex gap-2 items-center w-full overflow-hidden">
          <UserAvatar
            className="group-hover:scale-105 transition-transform text-primary"
            src={otherUser?.image}
            alt={otherUser?.name || "Deleted Account"}
          />
          <div className="flex-1 min-w-0">
            <p className="truncate">
              {name || otherUser?.name || "Deleted Account"}
            </p>
            <div className="flex  items-center">
              <p className="text-sm truncate">
                {lastMessage?.senderId === session?.user.id ? (
                  <span
                    className={`mr-1 ${
                      active ? "text-neutral-300" : "text-neutral-400"
                    }`}
                  >
                    You:
                  </span>
                ) : null}
                {lastMessageBody}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xs whitespace-nowrap">
            {formatMessageDate(
              new Date(
                lastMessage?.createdAt ? lastMessage?.createdAt : createdAt
              )
            )}
          </p>
          {hasSeen && (
            <span
              className={`flex justify-center items-center h-5 w-5 text-xs rounded-full ${
                active
                  ? "bg-primary-foreground dark:bg-primary text-primary dark:text-primary-foreground"
                  : "bg-accent text-primary-foreground dark:text-primary"
              }`}
            >
              {unseenMessagesCount}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ConversationBox;
