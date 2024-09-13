import React from "react";
import Sidebar from "./sidebar/Sidebar";
import MobileMenu from "./mobile/MobileMenu";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <section className="text-primary md:grid md:grid-cols-[50px_30%_1fr] h-screen bg-background">
        <Sidebar />
        <div className="bg-accent"></div>
        <MobileMenu />
        {children}
      </section>
    </main>
  );
};

export default UsersLayout;
