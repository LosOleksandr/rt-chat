import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="absolute top-0 right-0 p-4">
      
    </header>
  );
};

export default Header;
