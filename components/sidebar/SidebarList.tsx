import React from "react";

import Link from "next/link";
import useRoutes from "@/hooks/useRoutes";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import ThemeToggler from "../ThemeToggler";

const SidebarList = () => {
  const { data: session } = useSession();

  const routes = useRoutes();

  return (
    <nav className="h-full flex flex-col justify-between items-center">
      <ul className="flex flex-col gap-2">
        <li>
          <ThemeToggler />
        </li>
        {routes.map(({ href, icon: Icon, label, active, onClick }) => (
          <li
            key={href}
            className={`${
              active ? "bg-accent hover:text-inherit" : null
            } rounded-lg max-w-max hover:text-accent transition-colors last:hover:text-danger-hover`}
            title={label}
          >
            <span className="hidden">{label}</span>
            <Link
              href={href}
              onClick={onClick}
              className="h-full w-full flex  p-1"
            >
              <Icon />
            </Link>
          </li>
        ))}
      </ul>
      <div title="My account">
        <Link
          href={`/account/${session?.user.id}`}
          className="group flex flex-col items-center text-sm transition-transform"
        >
          <UserAvatar
            className="group-hover:scale-105"
            size={"md"}
            src={session?.user.image}
            alt={session?.user.name}
            isOnline={true}
          />
          Me
        </Link>
      </div>
    </nav>
  );
};

export default SidebarList;
