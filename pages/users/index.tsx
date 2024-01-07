import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const UsersPage = ({}) => {
  const { data: session } = useSession();
  return (
    <Layout>
      <main>
        <div className="mb-4">Hi, {session?.user.name}</div>

        <Button onClick={() => signOut()}>Logout</Button>
      </main>
    </Layout>
  );
};

export default UsersPage;
