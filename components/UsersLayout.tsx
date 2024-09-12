import React from "react";
import Sidebar from "./sidebar/Sidebar";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid text-primary lg:grid-cols-[1fr_3fr] h-screen bg-background">
      <Sidebar />
      {children}
    </main>
  );
};

export default UsersLayout;
