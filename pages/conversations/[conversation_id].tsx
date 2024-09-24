import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import getConversationById from "@/lib/getConversationById";
import { TFullConversation } from "@/types/api";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import ConversationBody from "@/components/conversation/ConversationBody";
import ConversationForm from "@/components/conversation/ConversationForm";

type TConversationPage = {
  conversation: TFullConversation;
};

const Conversation: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ conversation }) => {
  console.log("messages: ", conversation.messages);
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
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  const conversationId = context.params?.conversation_id as string;

  if (!conversationId) {
    return { redirect: { destination: "/conversations", permanent: false } };
  }

  const conversation = await getConversationById(conversationId, 25);

  if (!conversation) {
    return { redirect: { destination: "/conversations", permanent: false } };
  }

  return {
    props: {
      conversation: JSON.parse(JSON.stringify(conversation)),
    },
  };
};

export default Conversation;
