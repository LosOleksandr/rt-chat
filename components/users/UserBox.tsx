import { Conversation, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import UserAvatar from "../sidebar/UserAvatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import instance from "@/lib/instance";
import { AxiosResponse } from "axios";

type TUserBox = User;

type TAxiosConversationRequest = {
  userId: string;
};

type TAxiosConversationResponse =
  | {
      conversation: Conversation;
      message: string;
    }
  | string;

const UserBox = ({ name, image, id }: TUserBox) => {
  const router = useRouter();

  const [, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    instance
      .post<
        TAxiosConversationRequest,
        AxiosResponse<TAxiosConversationResponse>
      >("/conversations/create", {
        userId: id,
      })
      .then(({ data }) => {
        if (typeof data !== "string" && data.conversation) {
          router.push(`/conversations/${data.conversation.id}`);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [id, router]);

  return (
    <li>
      <Link
        href={""}
        className="group flex items-center gap-4 border-b border-border p-2 hover:border-transparent transition-colors hover:bg-slate-100/90 dark:hover:bg-neutral-500/90"
        title={name || ""}
        onClick={handleClick}
      >
        <UserAvatar
          src={image || ""}
          alt={name || ""}
          className="group-hover:scale-105 transition-transform"
        />
        {name}
      </Link>
    </li>
  );
};

export default UserBox;
