import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef, InputHTMLAttributes } from "react";

type TFileInput = {
  asChild?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const FileInput = forwardRef<HTMLInputElement, TFileInput>(
  ({ asChild, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp className={cn("hover:text-accent", className)}>
        <label className="cursor-pointer" title="Browse files">
          {children}
          <input type="file" className="hidden" ref={ref} {...props} />
        </label>
      </Comp>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
