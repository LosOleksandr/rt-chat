import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Message } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import getConversationById from "@/lib/getConversationById";
import getMessagesByConversationId from "@/lib/getMessages";
import { TFullConversation } from "@/types/api";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import ConversationBody from "@/components/conversation/ConversationBody";
import ConversationForm from "@/components/conversation/ConversationForm";

type TConversationPage = {
  conversation: TFullConversation;
  messages: Message[];
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
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  const conversationId = context.params?.conversation_id as string;

  if (!conversationId) {
    return { redirect: { destination: "/conversations", permanent: false } };
  }

  const conversation = await getConversationById(conversationId);
  const messages = await getMessagesByConversationId(conversationId);

  if (!conversation || !messages) {
    return { redirect: { destination: "/conversations", permanent: false } };
  }

  return {
    props: {
      conversation: JSON.parse(JSON.stringify(conversation)),
      messages: JSON.parse(JSON.stringify(messages)),
    },
  };
};

export default Conversation;
