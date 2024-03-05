import UsersLayout from "@/components/UsersLayout";
import UserAvatar from "@/components/sidebar/UserAvatar";
import { NextPageWithLayout } from "@/pages/_app";
import { useSession } from "next-auth/react";
import React, { ReactElement } from "react";

const AccountPage: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <section>
      <UserAvatar />
      <h1>{session?.user.name}</h1>
      <h2>{session?.user.email}</h2>
    </section>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default AccountPage;
