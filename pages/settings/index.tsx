import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import GlobalLayout from "@/components/GlobalLayout";

const Conversations: NextPageWithLayout = () => {
  return <div className="container">settings</div>;
};

Conversations.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};

export default Conversations;
