import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", isError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full px-2.5 bg-input rounded-md text-lg border-2 border-inputBorder",
          "focus:border-accent focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isError && "border-error focus:border-error",
          className
        )}
        aria-invalid={isError}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
