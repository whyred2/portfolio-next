import * as React from "react";

import { cn } from "@/lib/utils";

export interface NavigationItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function HeaderItem({ className, children, ...props }: NavigationItemProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center p-[10px] rounded-full bg-background2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function NavigationItem({
  className,
  children,
  ...props
}: NavigationItemProps) {
  return (
    <div
      className={cn(
        "bg-secondary px-5 h-[40px] rounded-full overflow-hidden select-none",
        "flex justify-center items-center cursor-pointer",
        "transition-bg duration-300 hover:bg-secondaryHover active:bg-active active:transition-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { HeaderItem, NavigationItem };
