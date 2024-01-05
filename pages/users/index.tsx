import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Users = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="mb-4">Hi, {session?.user.name}</div>

      <Button onClick={() => signOut()}>Logout</Button>
    </>
  );
};

export default Users;
