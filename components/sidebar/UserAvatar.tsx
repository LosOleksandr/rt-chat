import React, { forwardRef, RefAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";
import getInitials from "@/lib/getInitials";
import { IconPhotoPlus } from "@tabler/icons-react";
import FileInput from "../ui/file-input";

const avatarVariants = cva("overflow-visible border-2 border-accent", {
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
  isOnline?: boolean;
} & Omit<AvatarProps & RefAttributes<HTMLSpanElement>, "ref"> &
  VariantProps<typeof avatarVariants>;

const UserAvatar = forwardRef<HTMLSpanElement, TUserAvatar>(
  ({ className, src, alt, size, withFileInput, isOnline, ...props }, ref) => {
    const initials = getInitials(alt);
    return (
      <Avatar
        ref={ref}
        className={cn(
          avatarVariants({ size, className }),
          `${
            isOnline
              ? "after:h-2 after:w-2 after:bg-success after:absolute after:top-o after:right-0 after:rounded-full"
              : null
          }`
        )}
        {...props}
      >
        <AvatarImage className="rounded-full" src={src} alt={alt || ""} />
        <AvatarFallback>{initials}</AvatarFallback>
        {withFileInput ? (
          <FileInput asChild>
            <IconPhotoPlus />{" "}
          </FileInput>
        ) : null}
      </Avatar>
    );
  }
);

UserAvatar.displayName = "User Avatar";

export default UserAvatar;
