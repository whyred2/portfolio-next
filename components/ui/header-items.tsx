import * as React from "react";

import { cn } from "@/lib/utils";

export interface NavigationItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isActive?: boolean;
}

function HeaderItem({ className, children, ...props }: NavigationItemProps) {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function NavigationItem({
  className,
  children,
  isActive,
  ...props
}: NavigationItemProps) {
  return (
    <div
      className={cn(
        "bg-secondary px-5 py-1 rounded-full overflow-hidden select-none",
        "flex justify-center items-center cursor-pointer",
        "transition-bg duration-300 active:transition-none",
        isActive
          ? "bg-active text-white"
          : "hover:bg-secondaryHover active:bg-active",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { HeaderItem, NavigationItem };
