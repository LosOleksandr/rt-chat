import React from "react";
import Sidebar from "./sidebar/Sidebar";
import SidebarList from "./sidebar/SidebarList";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="text-primary md:grid md:grid-cols-[50px_20%_1fr] h-screen bg-background">
        <Sidebar>
          <SidebarList />
        </Sidebar>
        {children}
        {/* <MobileFooter>
          <MobileFooterList />
        </MobileFooter> */}
      </div>
    </main>
  );
};

export default GlobalLayout;
