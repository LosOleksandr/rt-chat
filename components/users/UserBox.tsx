import { User } from "@prisma/client";
import React from "react";
import UserAvatar from "../sidebar/UserAvatar";
import Link from "next/link";

type TUserBox = User;

const UserBox = ({ name, image }: TUserBox) => {
  return (
    <li className="">
      <Link
        href={""}
        className="group flex items-center gap-4 border-b border-border p-2 hover:border-transparent transition-colors hover:bg-slate-100/90 dark:hover:bg-neutral-500/90"
        title={name || ""}
      >
        <UserAvatar
          src={image || ""}
          alt={name || ""}
          className="group-hover:scale-105 transition-transform"
        />
        {name}
      </Link>
    </li>
  );
};

export default UserBox;
