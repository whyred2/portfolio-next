import * as React from "react";

import { cn } from "@/lib/utils";

export interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Phone = React.forwardRef<HTMLDivElement, PhoneProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("rotate-6", className)} ref={ref}>
        <div
          className={cn(
            "relative flex items-start justify-center p-2 bg-[#383838] h-[600px] w-[300px] rounded-[32px]",
            "before:absolute before:-top-[12px] before:w-full before:h-[100px] before:bg-[#5f5f5f] before:rounded-[32px] before:-z-[10]",
            "after:absolute after:top-0 after:w-[calc(100%-160px)] after:h-[26px] after:bg-[#383838] after:rounded-b-[8px]"
          )}
          {...props}
        >
          <div className="absolute top-[150px] -right-[2px] bg-[#272727] w-[3px] h-[50px] rounded-r" />
          {children}
        </div>
      </div>
    );
  }
);
Phone.displayName = "Phone";

const Screen = React.forwardRef<HTMLDivElement, PhoneProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-accent text-white p-2 pt-5 w-full h-full rounded-[26px] shadow-[inset_0px_0px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden",
          "before:absolute before:top-0 before:left-[58px] before:h-[30px] before:w-[30px] before:bg-transparent before:border-solid before:rounded-full before:border-[8px] before:rotate-45 before:border-t-[#383838] before:border-l-transparent before:border-b-transparent before:border-r-transparent",
          "after:absolute after:top-0 after:right-[58px] after:h-[30px] after:w-[30px] after:bg-transparent after:border-solid after:rounded-full after:border-[8px] after:rotate-45 after:border-l-[#383838] after:border-b-transparent after:border-t-transparent after:border-r-transparent",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Screen.displayName = "Screen";

export { Phone, Screen };
