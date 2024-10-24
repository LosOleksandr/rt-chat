import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ConversationsLayout from "@/components/conversations/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ConversationBody from "@/components/conversation/ConversationBody";
import ConversationForm from "@/components/conversation/ConversationForm";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/ui/spinner";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const conversationId = params?.conversation_id as string;

  return {
    props: { conversationId },
  };
};

const Page: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ conversationId }) => {
  const { data: conversation, isLoading } = useSWR(
    `/api/conversations/${conversationId}`,
    fetcher
  );

  return (
    <section className="flex flex-col h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ConversationHeader conversation={conversation} />
          <ConversationBody messages={conversation?.messages} />
        </>
      )}
      <ConversationForm />
    </section>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <ConversationsLayout>{page}</ConversationsLayout>;
};

const Loading = () => {
  return (
    <>
      <div className="flex items-center h-14 p-2 gap-2 bg-background-secondary border-b border-border">
        <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
        <div className="flex flex-col gap-2 justify-end">
          <Skeleton className="w-24 h-2"></Skeleton>
          <Skeleton className="w-10 h-2"></Skeleton>
        </div>
      </div>
      <div className="h-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-8 h-8">
          <LoadingSpinner className="w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default Page;
