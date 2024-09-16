import { User } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <ul className="flex flex-col gap-4 mt-4 overflow-auto">
      {users.length > 0 &&
        users.map(({ id, ...props }) => {
          return <UserBox key={id} id={id} {...props} />;
        })}
    </ul>
  );
};

export default UsersList;
