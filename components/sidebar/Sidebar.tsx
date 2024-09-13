import React from "react";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  return (
    <aside className="hidden md:block bg-background-secondary p-2">
      <SidebarMenu />
    </aside>
  );
};

export default Sidebar;
