import GlobalLayout from "@/components/GlobalLayout";
import React, { ReactNode } from "react";
import ConversationList from "../ConversationList";
import Heading from "@/components/ui/heading";

const ConversationsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <GlobalLayout>
      <section className="p-4 bg-background-secondary border-r border-border">
        <Heading as="h2" variant={"bold"} size={"xl"}>
          Chats
        </Heading>
        <ConversationList />
      </section>
      {children}
    </GlobalLayout>
  );
};

export default ConversationsLayout;
