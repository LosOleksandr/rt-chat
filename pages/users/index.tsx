import UsersLayout from "@/components/UsersLayout";
import { useSession } from "next-auth/react";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const UsersPage: NextPageWithLayout = ({}) => {
  const { data: session } = useSession();
  return <section>Hi, {session?.user.name}</section>;
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default UsersPage;
