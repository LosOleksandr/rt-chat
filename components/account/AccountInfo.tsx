import { IconPhone } from "@tabler/icons-react";
import { IconMail, IconUser } from "@tabler/icons-react";
import React from "react";
import { User } from "@prisma/client";

type TAccountInfo = {
  user: User;
  setIsEditing: (mode: boolean) => void;
};

const AccountInfo = ({ user }: TAccountInfo) => {
  const userAccountDetails = [
    { name: "username", value: user?.name, icon: <IconUser /> },
    { name: "email", value: user?.email, icon: <IconMail /> },
    { name: "phone", value: user?.phone, icon: <IconPhone /> },
    { name: "about me", value: user?.description, icon: <IconUser /> },
  ];

  return (
    <>
      <ul className="grid gap-2">
        {userAccountDetails.map(({ name, value, icon }) => {
          return (
            <li key={name} className="flex gap-2 items-center">
              {icon}
              <p>
                {!!value ? value : "- - -"}
                <span className="block text-sm capitalize">{name}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AccountInfo;
