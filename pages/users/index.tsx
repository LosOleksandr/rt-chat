import UsersLayout from "@/components/UsersLayout";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import UserList from "@/components/users/UsersList";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import getUsers from "@/lib/getUsers";
import { User } from "@prisma/client";

const UsersPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user_session, users }) => {
  return (
    <>
      <section className="p-4 bg-background-secondary">
        <h2 className="text-xl font-bold">People</h2>
        <UserList users={users} />
      </section>
      <div className="container">
        <section>Hi, {user_session?.name}</section>
      </div>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  const users = await getUsers(session.user.email || "");
  
  return {
    props: {
      user_session: session.user,
      users: JSON.parse(JSON.stringify(users)) as User[],
    },
  };
}) satisfies GetServerSideProps;

export default UsersPage;
