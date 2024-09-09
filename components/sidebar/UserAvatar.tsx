import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import FileInput from "../ui/file-input";

type TUserAvatar = {
  size?: "sm" | "md" | "lg";
  withFileInput?: boolean;
};

const setAvatarSize = (size: TUserAvatar["size"]) => {
  switch (size) {
    case "sm":
      return "w-10 h-10 text-md";
    case "md":
      return "w-20 h-20 text-md";
    case "lg":
      return "w-36 h-36 text-4xl";
    default:
      return "w-10 h-10 text-sm";
  }
};
const UserAvatar = ({ size, withFileInput = false }: TUserAvatar) => {
  const { data: session } = useSession();

  const avatarSize = setAvatarSize(size);
  return (
    <div className={`relative self-center ${avatarSize} `}>
      {session?.user.image ? (
        <>
          <Image
            src={session.user.image}
            alt={`${session.user.name} avatar`}
            fill
            className="absolute top-0 left-0 rounded-full"
          />
          {withFileInput ? <FileInput /> : null}
        </>
      ) : (
        <div className="flex justify-center items-center bg-slate-400 w-full h-full rounded-full">
          <span className="uppercase font-extrabold text-secondary">
            {session?.user.name && session?.user.name[0]}{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
