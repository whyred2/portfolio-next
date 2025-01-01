import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-40 max-h-[400px] min-h-20 w-full rounded-md border-2 border-inputBorder bg-input px-3 py-2 text-base",
          "focus:border-accent focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        style={{
          scrollbarWidth: "none",
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
