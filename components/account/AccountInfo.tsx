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
    {
      name: "username",
      value: user?.name,
      icon: <IconUser className="h-8 w-8" />,
    },
    {
      name: "email",
      value: user?.email,
      icon: <IconMail className="h-8 w-8" />,
    },
    {
      name: "phone",
      value: user?.phone,
      icon: <IconPhone className="h-8 w-8" />,
    },
  ];

  return (
    <>
      <ul className="flex flex-col gap-4">
        {userAccountDetails.map(({ name, value, icon }) => {
          return (
            <li
              key={name}
              className="grid grid-cols-[32px_auto] gap-4 items-center "
            >
              {icon}
              <p
                className={`break-words overflow-hidden leading-4  ${
                  name === "about me" && ""
                }`}
              >
                {!!value ? value : "- - -"}

                <span className="block text-sm capitalize mt-2">{name}</span>
              </p>
            </li>
          );
        })}
        <li className="mt-4">
          <p className={"break-words overflow-hidden leading-4 "}>
            {!!user.description ? user.description : "- - -"}
            <span className="block text-sm capitalize mt-2">About me</span>
          </p>
        </li>
      </ul>
    </>
  );
};

export default AccountInfo;
