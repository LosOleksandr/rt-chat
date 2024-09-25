import React from "react";
import UserBox from "./UserBox";
import { TUsersWithConversationExists } from "@/types/api";
import useSWR, { SWRResponse } from "swr";
import fetcher from "@/lib/fetcher";

const UsersList = () => {
  const {
    data: users,
    isLoading,
  }: SWRResponse<TUsersWithConversationExists[]> = useSWR(
    "/api/users/get",
    fetcher
  );
  
  if (isLoading) return <Loading />;

  return (
    <ul className="flex flex-col gap-1 mt-4 overflow-auto">
      {users &&
        users.map(({ id, ...props }) => {
          return <UserBox key={id} id={id} {...props} />;
        })}
    </ul>
  );
};
const Loading = () => {
  return <ul className="flex flex-col gap-4">Loading</ul>;
};

export default UsersList;
