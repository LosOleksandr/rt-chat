import React, { ReactNode } from "react";

const MobileFooter = ({ children }: { children: ReactNode }) => {
  return (
    <footer className="md:hidden bg-background-secondary w-full fixed bottom-0">
      {children}
    </footer>
  );
};

export default MobileFooter;
