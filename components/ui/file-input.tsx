import { IconPhotoPlus } from "@tabler/icons-react";
import React from "react";

const FileInput = ({ ...props }) => {
  return (
    <div className="absolute bottom-2 right-2 text-secondary text-sm bg-primary rounded-md  hover:bg-black/50 hover:scale-105">
      <label className="cursor-pointer" title="Browse files">
        <IconPhotoPlus />
        <input type="file" className="hidden" />
      </label>
    </div>
  );
};

export default FileInput;
