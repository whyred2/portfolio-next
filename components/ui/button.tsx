import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center rounded-lg duration-300 select-none active:bg-active active:duration-0 border-2 active:border-active",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-white hover:bg-accentHover hover:border-accentHover border-accent",
        secondary: "bg-secondary hover:bg-secondaryHover",
        delete:
          "bg-red-500 text-white hover:bg-red-800 border-red-500 hover:border-red-800",
        disabled:
          "opacity-50 cursor-not-allowed active:bg-transpared border-2 border-inputBorder",
        loading: "opacity-75",
      },
      size: {
        default: "px-5 py-3",
        sm: "h-8 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
