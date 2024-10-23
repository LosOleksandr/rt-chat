import React, { PropsWithChildren } from "react";
import Heading from "./ui/heading";
import { cn } from "@/lib/utils";

const EmptyState = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("grid place-items-center h-full", className)}>
      <Heading
        as={"h2"}
        size={"sm"}
        className="bg-background-secondary dark:bg-neutral-500/90 px-3 py-1 rounded-xl"
      >
        {children}
      </Heading>
    </div>
  );
};

export default EmptyState;
