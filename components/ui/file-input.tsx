import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef, InputHTMLAttributes } from "react";

type TFileInput = {
  asChild?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const FileInput = forwardRef<HTMLInputElement, TFileInput>(
  ({ asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp className="absolute bottom-2 right-2 text-primary-foreground text-sm bg-primary rounded-md hover:bg-black/90 dark:hover:bg-white/90 hover:scale-105">
        <label className="cursor-pointer" title="Browse files">
          {children}
          <input type="file" className="hidden" ref={ref} {...props} />
        </label>
      </Comp>
    );
  }
);

export default FileInput;
