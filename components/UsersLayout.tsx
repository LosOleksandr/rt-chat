import React from "react";
import Sidebar from "./sidebar/Sidebar";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid lg:grid-cols-[1fr_3fr] h-screen">
      <Sidebar />
      <div className="w-full max-w-2xl justify-self-center">{children}</div>
    </main>
  );
};

export default UsersLayout;
