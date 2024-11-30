import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "flex items-center w-full justify-center rounded-full duration-300 cursor-pointer select-none active:bg-active active:duration-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-accentHover",
        secondary: "bg-secondary hover:bg-secondaryHover",
        delete: "bg-[#c20000] text-white hover:bg-[#990000] active:bg-[#d2224d]",
        disabled: "opacity-50 cursor-not-allowed",
        loading: "opacity-75",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-4",
        lg: "h-12 px-6",
      },
      
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

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
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
