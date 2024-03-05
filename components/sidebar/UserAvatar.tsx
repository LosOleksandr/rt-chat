import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserAvatar = () => {
  const { data: session } = useSession();

  return (
    <div className="relative w-10 h-10">
      {session?.user.image ? (
        <Image
          src={session.user.image}
          alt={`${session.user.name} avatar`}
          fill
          className="absolute top-0 left-0 rounded-full"
        />
      ) : (
        <div className="flex justify-center items-center bg-slate-400 w-full h-full rounded-full">
          <span className="uppercase text-lg font-extrabold">
            {session?.user.name && session?.user.name[0]}{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
