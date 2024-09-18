import { User } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import UserBox from "./UserBox";
import instance from "@/lib/instance";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    instance
      .get("/users/get")
      .then(({ data: users }) => setUsers(users))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <Loading />;

  return (
    <ul className="flex flex-col gap-1 mt-4 overflow-auto">
      {users.length > 0 &&
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
