import { IconEdit, IconPhone } from "@tabler/icons-react";
import { IconMail, IconUser } from "@tabler/icons-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import AccountForm from "./AccountForm";
import { User } from "@prisma/client";

type TAccountInfo = {
  user: User;
};

const AccountInfo = ({ user }: TAccountInfo) => {
  const [isEditing, setIsEditing] = useState(false);

  const userAccountDetails = [
    { name: "username", value: user?.name, icon: <IconUser /> },
    { name: "email", value: user?.email, icon: <IconMail /> },
    { name: "phone", value: user?.phone, icon: <IconPhone /> },
    { name: "about me", value: user?.description, icon: <IconUser /> },
  ];

  return (
    <>
      <div className="flex items-center text-lg">
        <h3>User Info</h3>
        {!isEditing && (
          <Button
            variant={"ghost"}
            className=""
            onClick={() => setIsEditing(true)}
          >
            <IconEdit />
          </Button>
        )}
      </div>
      {!isEditing ? (
        <ul className="grid gap-2">
          {userAccountDetails.map(({ name, value, icon }) => {
            console.log(value);
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
      ) : (
        <AccountForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          user={user}
        />
      )}
    </>
  );
};



export default AccountInfo;
