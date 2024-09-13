import React from "react";
import SidebarMenu from "../sidebar/SidebarMenu";

const MobileMenu = () => {
  return (
    <div className="md:hidden p-2">
      <SidebarMenu />
    </div>
  );
};

export default MobileMenu;
