import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";
import EmptyState from "@/components/EmptyState";

const ConversationsPage: NextPageWithLayout = () => {
  return (
    <>
      <EmptyState>Select a conversation to start chatting</EmptyState>
    </>
  );
};

ConversationsPage.getLayout = function getLayout(page: ReactElement) {
  return <ConversationsLayout>{page}</ConversationsLayout>;
};

export default ConversationsPage;
