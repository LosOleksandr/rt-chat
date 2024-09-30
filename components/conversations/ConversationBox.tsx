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
    const messagesArr = messages || [];

    return messagesArr[messages.length - 1];
  }, [messages]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArr = lastMessage.seen || [];

    if (session?.user.email) {
      return false;
    }

    return (
      seenArr.filter((user) => user.email === session?.user.email).length !== 0
    );
  }, [lastMessage, session?.user.email]);

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
      } group  rounded-md transition-colors`}
    >
      <Link
        href={conversationsHref}
        className="flex items-center justify-between gap-4 p-2 "
      >
        <div className="flex gap-2 items-center">
          <UserAvatar
            className="group-hover:scale-105 transition-transform text-primary"
            src={otherUser?.image}
            alt={otherUser?.name || "Deleted Account"}
          />
          <div>
            <p>{name || otherUser?.name || "Deleted Account"}</p>
            <p className="text-sm relative">
              {lastMessageBody}
              {hasSeen && (
                <span className="absolute h-2 w-2 rounded-full bg-accent top-1/2 -translate-y-1/2 -right-5" />
              )}
            </p>
          </div>
        </div>
        <p className="text-xs">
          {formatMessageDate(
            new Date(
              lastMessage?.createdAt ? lastMessage?.createdAt : createdAt
            )
          )}
        </p>
      </Link>
    </li>
  );
};

export default ConversationBox;
