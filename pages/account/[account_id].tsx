import UsersLayout from "@/components/conversations/layout";
import AccountForm from "@/components/account/AccountForm";
import AccountInfo from "@/components/account/AccountInfo";
import UserAvatar from "@/components/sidebar/UserAvatar";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextPageWithLayout } from "@/pages/_app";
import { IconEdit } from "@tabler/icons-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import React, { ReactElement, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const AccountPage: NextPageWithLayout = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(user);

  return (
    <section className="flex flex-col w-full lg:max-w-xl md:max-w-md justify-self-center justify-center px-11 gap-4 h-full md:bg-background-secondary md:border-x-2 ">
      <span className="border border-border w-full h-px" />
      <UserAvatar
        className=""
        withFileInput={true}
        size="2xl"
        src={userInfo.image}
        alt={userInfo.name}
      />
      <span className="border border-border w-full h-px" />
      <div className="flex items-center text-lg">
        <h3>User Info</h3>
        {!isEditing && (
          <Button variant={"ghost"} onClick={() => setIsEditing(true)}>
            <IconEdit />
          </Button>
        )}
      </div>
      {isEditing ? (
        <AccountForm
          setIsEditing={setIsEditing}
          user={userInfo}
          setUserInfo={setUserInfo}
        />
      ) : (
        <AccountInfo setIsEditing={setIsEditing} user={userInfo} />
      )}
      <span className="border border-border w-full h-px" />
    </section>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <UsersLayout>{page}</UsersLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user.email) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  const user = await getCurrentUser(context);

  return { props: { user } };
};

export default AccountPage;
