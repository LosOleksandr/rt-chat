import useRoutes from "@/hooks/useRoutes";
import Link from "next/link";
import React from "react";

const MobileFooterList = () => {
  const routes = useRoutes();
  return (
    <nav>
      <ul className="flex justify-between gap-2">
        {routes.map(({ href, icon: Icon, label, active, onClick }) => (
          <li
            key={href}
            className={`${
              active ? "text-accent" : null
            } w-full hover:text-accent flex flex-col justify-center transition-colors last:hover:text-danger-hover border-l first-of-type:border-0`}
          >
            <Link
              href={href}
              onClick={onClick}
              className="h-full w-full flex flex-col items-center p-1 "
            >
              <Icon />
            </Link>
            <span className="text-center">{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileFooterList;
