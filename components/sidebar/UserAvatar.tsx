import React, { forwardRef, RefAttributes } from "react";
import FileInput from "../ui/file-input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";
import getInitials from "@/lib/getInitials";

const avatarVariants = cva("mx-auto overflow-visible", {
  variants: {
    size: {
      icon: "w-5 h-5 text-xs bg-transparent",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-md",
      lg: "w-20 h-20 text-lg",
      xl: "w-24 h-24 text-xl",
      "2xl": "w-28 h-28 text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type TUserAvatar = {
  src?: string;
  alt: string;
  withFileInput?: boolean;
} & Omit<AvatarProps & RefAttributes<HTMLSpanElement>, "ref"> &
  VariantProps<typeof avatarVariants>;

const UserAvatar = forwardRef<HTMLSpanElement, TUserAvatar>(
  ({ className, src, alt, size, withFileInput, ...props }, ref) => {
    const initials = getInitials(alt);
    return (
      <Avatar
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        <AvatarImage className="rounded-full" src={src || ""} alt={alt || ""} />
        <AvatarFallback>{initials}</AvatarFallback>
        {withFileInput ? <FileInput /> : null}
      </Avatar>
    );
  }
);

UserAvatar.displayName = "User Avatar";

export default UserAvatar;
