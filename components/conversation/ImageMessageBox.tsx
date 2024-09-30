import { IconCheck, IconChecks } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

type TImageMessageBox = {
  src: string;
  alt: string;
  body: string | null;
  date: string;
  isOwn: boolean;
  isSeen?: boolean;
};

const ImageMessageBox = ({
  alt,
  src,
  body,
  date,
  isOwn,
  isSeen = true,
}: TImageMessageBox) => {
  return (
    <div
      className={`${
        isOwn ? "bg-accent " : "bg-background-secondary"
      } p-1 relative rounded-lg`}
    >
      <Image
        src={src}
        width={200}
        height={200}
        alt={alt}
        className="rounded-xl"
      />
      {body ? (
        <p className="mt-2 ml-1 flex items-center justify-between gap-2">
          {body}
          <span className="mt-auto flex gap-1">
            <span className="text-xs">{date}</span>
            {isSeen ? (
              <IconChecks className="w-4 h-4" />
            ) : (
              <IconCheck className="w-4 h-4" />
            )}
          </span>
        </p>
      ) : (
        <span className="absolute bottom-2 right-2 px-1 bg-black/50 rounded-xl flex items-center gap-1">
          <p className="text-xs">{date}</p>
          {isSeen ? (
            <IconChecks className="w-4 h-4" />
          ) : (
            <IconCheck className="w-4 h-4" />
          )}
        </span>
      )}
    </div>
  );
};

export default ImageMessageBox;
