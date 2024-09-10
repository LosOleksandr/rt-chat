import UsersLayout from "@/components/UsersLayout";
import AccountForm from "@/components/account/AccountForm";
import AccountInfo from "@/components/account/AccountInfo";
import UserAvatar from "@/components/sidebar/UserAvatar";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/getUser";
import { NextPageWithLayout } from "@/pages/_app";
import { IconEdit } from "@tabler/icons-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { ReactElement, useState } from "react";

const AccountPage: NextPageWithLayout = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(user);

  return (
    <section className="flex flex-col w-full max-w-xl justify-self-center justify-center px-11 gap-4 h-full bg-background-secondary border-x-2 ">
      <span className="border border-border w-full h-px" />
      <UserAvatar withFileInput={true} size="lg" />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await getUser(params?.acount_id as string);

  if (!user) {
    return { redirect: { destination: "/users", permanent: false } };
  }

  return { props: { user } };
};

export default AccountPage;
