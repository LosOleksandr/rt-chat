import React from "react";
import GlobalLayout from "@/components/GlobalLayout";
import UsersList from "../UsersList";
import Heading from "@/components/ui/heading";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalLayout>
      <section className="p-4 bg-background-secondary">
        <Heading as={"h2"} variant={"bold"} size={"xl"}>
          People
        </Heading>
        <UsersList />
      </section>
      {children}
    </GlobalLayout>
  );
};

export default UsersLayout;
