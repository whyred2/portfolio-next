import * as React from "react";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "min-w-[300px] h-[200px] p-5 flex flex-col rounded-lg border border-border backdrop-blur shadow-lg card",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl w-full flex justify-between items-center border-b border-gray-300",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-lg h-full mt-2", className)} {...props} />
));
CardDescription.displayName = "CardDesctiption";

const CardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-6 h-6 flex items-center justify-center", className)}
    {...props}
  >
    {children || <Plus className="w-full h-full" />}
  </div>
));
CardIcon.displayName = "CardIcon";

export { Card, CardTitle, CardDescription, CardIcon };
