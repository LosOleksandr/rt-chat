import React from "react";
import UserBox from "./UserBox";
import { TUsersWithConversationExists } from "@/types/api";
import useSWR, { SWRResponse } from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "../ui/skeleton";

const UsersList = () => {
  const {
    data: users,
    isLoading,
  }: SWRResponse<TUsersWithConversationExists[]> = useSWR(
    "/api/users/get",
    fetcher
  );

  if (isLoading) {
    return <Loading number={5} />;
  }

  return (
    <>
      <ul className="flex flex-col gap-1 mt-4 overflow-auto">
        {users &&
          users.map(({ id, ...props }) => {
            return <UserBox key={id} id={id} {...props} />;
          })}
      </ul>
    </>
  );
};

const Loading = ({ number }: { number: number }) => {
  return (
    <ul className="flex flex-col gap-1 mt-4 overflow-auto">
      {Array.from({ length: number }).map((_, index) => (
        <li key={index} className="flex items-center gap-4 p-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-28 h-3" />
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
