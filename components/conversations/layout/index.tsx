import GlobalLayout from "@/components/GlobalLayout";
import React, { ReactNode } from "react";
import ConversationList from "../ConversationList";

const ConversationsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <GlobalLayout>
      <section className="p-4 bg-background-secondary">
        <h2 className="text-xl font-bold">Chats</h2>
        <ConversationList />
      </section>
      {children}
    </GlobalLayout>
  );
};

export default ConversationsLayout;
