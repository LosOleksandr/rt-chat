import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import UsersLayout from "@/components/users/layout";
import getSession from "@/lib/getSession";
import EmptyState from "@/components/EmptyState";

const UsersPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user_session }) => {
  return (
    <>
      <section>
        <EmptyState className="text-center">
          Hi, <span className="font-bold">{user_session?.name}</span>
          <br />
          Choose a person you want to start conversation with
        </EmptyState>
      </section>
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
