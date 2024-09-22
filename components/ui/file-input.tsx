import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef, InputHTMLAttributes } from "react";

const fileInputVariants = cva("absolute hover:text-accent z-50", {
  variants: {
    variant: {
      default: "static block",
      fixed_bottom_right: "bottom-3 right-2",
      fixed_bottom_left: "bottom-3 left-2",
      fixed_top_right: "top-3 right-2",
      fixed_top_left: "top-3 left-2",
    },
    size: {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type TFileInput = {
  asChild?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof fileInputVariants>;

const FileInput = forwardRef<HTMLInputElement, TFileInput>(
  ({ asChild, className, variant, size, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp className={cn(fileInputVariants({ variant, size, className }))}>
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
