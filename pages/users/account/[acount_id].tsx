import UsersLayout from "@/components/UsersLayout";
import AccountInfo from "@/components/account/AccountInfo";
import UserAvatar from "@/components/sidebar/UserAvatar";
import { getUser } from "@/helpers/getUser";
import { NextPageWithLayout } from "@/pages/_app";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { ReactElement } from "react";

const AccountPage: NextPageWithLayout = ({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section className="flex flex-col justify-center px-11 gap-4 h-full bg-secondary dark:bg-primary border-x-2 ">
      <span className="border w-full h-px"></span>
      <UserAvatar withFileInput={true} size="lg" />
      <span className="border w-full h-px"></span>
      <AccountInfo user={user} />
      <span className="border w-full h-px"></span>
    </section>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await getUser(params?.acount_id as string);

  if (!user) {
    return { redirect: { destination: "/users", permanent: false } };
  }

  return { props: { user } };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default AccountPage;
