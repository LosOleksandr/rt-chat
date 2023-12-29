import { signOut } from "next-auth/react";
import React from "react";

type TSignOutBtn = {
  children: React.ReactNode;
};

const SignOutBtn = ({ children }: TSignOutBtn) => {
  return (
    <button
      type="button"
      onClick={() => {
        signOut({ redirect: false });
      }}
    >
      {children}
    </button>
  );
};

export default SignOutBtn;
