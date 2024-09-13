import React, { ReactNode } from "react";

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <aside className="hidden md:block bg-background-secondary p-2">
      {children}
    </aside>
  );
};

export default Sidebar;
