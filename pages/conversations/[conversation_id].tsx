import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getConversationById from "@/lib/getConversationById";
import { TFullConversation } from "@/types/api";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import ConversationBody from "@/components/conversation/ConversationBody";
import ConversationForm from "@/components/conversation/ConversationForm";
import getSession from "@/lib/getSession";

type TConversationPage = {
  conversation: TFullConversation;
};

const Conversation: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ conversation }) => {
  return (
    <>
      <section className="grid grid-rows-[fit-content(10%)_1fr_fit-content(10%)]">
        <ConversationHeader conversation={conversation} />
        <ConversationBody />
        <ConversationForm />
      </section>
    </>
  );
};

Conversation.getLayout = function getLayout(page: ReactElement) {
  return <ConversationsLayout>{page}</ConversationsLayout>;
};

export const getServerSideProps: GetServerSideProps<TConversationPage> = async (
  context
) => {
  const session = await getSession(context);

  if (!session?.user) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  const conversationId = context.params?.conversation_id as string;

  if (!conversationId) {
    return { redirect: { destination: "/conversations", permanent: false } };
  }

  const conversation = await getConversationById(conversationId, 25);

  return {
    props: {
      conversation: JSON.parse(JSON.stringify(conversation)),
    },
  };
};

export default Conversation;
