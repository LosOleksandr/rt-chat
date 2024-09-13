import { usePathname } from "next/navigation";
import useConversations from "./useConversations";
import { useMemo } from "react";
import {
  IconLogout,
  IconMessage,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversations();

  const routes = useMemo(() => {
    return [
      {
        label: "Chats",
        href: "/conversations",
        icon: IconMessage,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: IconUsers,
        active: pathname === "/users",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: IconSettings,
        active: pathname === "/settings",
      },
      {
        label: "Logout",
        href: "#",
        icon: IconLogout,
        onClick: () => signOut(),
      },
    ];
  }, [pathname, conversationId]);

  return routes;
};

export default useRoutes;
