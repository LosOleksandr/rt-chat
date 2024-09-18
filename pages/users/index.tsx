import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import UsersLayout from "@/components/users/layout";

const UsersPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user_session }) => {
  return (
    <>
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

  return {
    props: {
      user_session: session.user,
    },
  };
}) satisfies GetServerSideProps;

export default UsersPage;
