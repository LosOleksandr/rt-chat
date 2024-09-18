import React from "react";
import GlobalLayout from "@/components/GlobalLayout";
import UsersList from "../UsersList";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalLayout>
      <section className="p-4 bg-background-secondary">
        <h2 className="text-xl font-bold">People</h2>
        <UsersList />
      </section>
      {children}
    </GlobalLayout>
  );
};

export default UsersLayout;
