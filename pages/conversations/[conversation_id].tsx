import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";

const Conversation: NextPageWithLayout = () => {
  return (
    <>
      <section>Conversation</section>
    </>
  );
};

Conversation.getLayout = function getLayout(page: ReactElement) {
  return <ConversationsLayout>{page}</ConversationsLayout>;
};



export default Conversation;
