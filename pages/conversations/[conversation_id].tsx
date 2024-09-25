import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import getConversationById from "@/lib/getConversationById";
import ConversationBody from "@/components/conversation/ConversationBody";
import ConversationForm from "@/components/conversation/ConversationForm";
import prisma from "@/lib/prisma";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import { TFullConversation } from "@/types/api";

export const getStaticPaths: GetStaticPaths = async () => {
  const conversations = await prisma.conversation.findMany({
    select: {
      id: true,
    },
  });

  const paths = conversations.map((conversation) => ({
    params: {
      conversation_id: conversation.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  conversation: TFullConversation;
}> = async ({ params }) => {
  const conversationId = params?.conversation_id as string;

  const conversation = await getConversationById(conversationId, 25);

  return {
    props: {
      conversation: JSON.parse(JSON.stringify(conversation)),
    },
  };
};

const Page: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getStaticProps>
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <ConversationsLayout>{page}</ConversationsLayout>;
};

export default Page;
