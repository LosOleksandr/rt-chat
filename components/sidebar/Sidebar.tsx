import React from "react";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  return (
    <aside className="lg:min-h-screen hidden lg:block bg-slate-200 dark:bg-zinc-700/50 border-r border-r-accent p-2">
      <SidebarMenu />
      <br />
    </aside>
  );
};

export default Sidebar;
