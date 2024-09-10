import React from "react";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  return (
    <aside className="lg:min-h-screen hidden lg:block bg-background-secondary  p-2">
      <SidebarMenu />
      <br />
    </aside>
  );
};

export default Sidebar;
