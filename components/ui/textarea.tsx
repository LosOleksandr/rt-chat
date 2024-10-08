import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldErrors } from "react-hook-form";
import { cva, VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "flex min-h-[40px] max-h-32 h-auto overflow-y-hidden resize-none no-scrollbar w-full rounded-md bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-2 border-border focus:border-accent",
        ghost: "border-2 border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type TTextArea = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Updated type here
  onBlur?: (e: React.SyntheticEvent) => void;
  label?: string;
  errors?: FieldErrors;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TTextArea>(
  ({ className, onChange, onBlur, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant }), className)}
        rows={1}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
