import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import UsersLayout from "@/components/UsersLayout";

const Conversation: NextPageWithLayout = () => {
  return <div>conversation</div>;
};

Conversation.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default Conversation;
