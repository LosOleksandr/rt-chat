import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import UsersLayout from "@/components/UsersLayout";

const Conversations: NextPageWithLayout = () => {
  return <div className="container">settings</div>;
};

Conversations.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default Conversations;
