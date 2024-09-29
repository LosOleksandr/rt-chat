import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import UsersLayout from "@/components/users/layout";
import getSession from "@/lib/getSession";

const UsersPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user_session }) => {
  return (
    <>
      <div className="container relative">
        <section>Hi, {user_session?.name}</section>
      </div>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  return {
    props: {
      user_session: session.user,
    },
  };
};

export default UsersPage;
