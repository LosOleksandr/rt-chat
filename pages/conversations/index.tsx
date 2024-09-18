import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";

const ConversationsPage: NextPageWithLayout = () => {
  return (
    <>
      <section>Conversation</section>
    </>
  );
};

ConversationsPage.getLayout = function getLayout(page: ReactElement) {
  return <ConversationsLayout>{page}</ConversationsLayout>;
};

export default ConversationsPage;
