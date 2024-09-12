import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import SearchInput from "./SearchInput";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ThemeToggler from "../ThemeToggler";
import UserAvatar from "./UserAvatar";

const SidebarMenu = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-0" variant={"ghost"}>
            <IconMenu2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              className="flex items-center gap-2"
              href={`users/account/${session?.user.id}`}
            >
              <UserAvatar
                size={"icon"}
                src={session?.user.image || ""}
                alt={session?.user.name || ""}
              />
              My Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ThemeToggler />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              onClick={() => signOut()}
              className="p-0 gap-1"
              variant={"ghost-destructive"}
            >
              Logout
              <IconLogout />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SearchInput />
    </div>
  );
};

export default SidebarMenu;
