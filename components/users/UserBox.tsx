import { Conversation } from "@prisma/client";
import React, { useCallback, useState } from "react";
import UserAvatar from "../sidebar/UserAvatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import instance from "@/lib/instance";
import { AxiosResponse } from "axios";
import { TUsersWithConversationExists } from "@/types/api";
import { LoadingSpinner } from "../ui/spinner";
import useConversations from "@/hooks/useConversations";

type TAxiosConversationRequest = {
  userId: string;
};

type TAxiosConversationResponse =
  | {
      conversation: Conversation;
      message: string;
    }
  | string;

const UserBox = ({ name, image, id }: TUsersWithConversationExists) => {
  const router = useRouter();
  const { conversationId } = useConversations();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    instance
      .post<
        TAxiosConversationRequest,
        AxiosResponse<TAxiosConversationResponse>
      >("/api/conversations/create", {
        userId: id,
      })
      .then(({ data }) => {
        if (typeof data !== "string" && data.conversation) {
          router.push(`/conversations/${data.conversation.id}`);
        }
      })
      .catch((err) => {
        console.error("Error", err);
        setIsLoading(false);
      });

    setIsLoading(!conversationId);
  }, [id, router, , conversationId]);

  return (
    <>
      <li
        className={`group transition-colors hover:bg-slate-100/90 dark:hover:bg-neutral-500/90 ${
          isLoading && !conversationId
            ? "bg-slate-100/90 dark:bg-neutral-500/90"
            : ""
        }`}
      >
        <Link
          href={""}
          className="flex items-center gap-2 p-2"
          title={name || ""}
          onClick={handleClick}
        >
          <UserAvatar
            src={image || ""}
            alt={name || ""}
            className="group-hover:scale-105 transition-transform"
          />
          <p>{name}</p>
          {isLoading ? <LoadingSpinner className="w-4 h-4" /> : null}
        </Link>
      </li>
    </>
  );
};

export default UserBox;
