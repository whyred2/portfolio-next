import * as React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";

const Alert = AlertDialog.Root;

const AlertTrigger = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Trigger>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Trigger>
>(({ children, ...props }, ref) => (
  <AlertDialog.Trigger ref={ref} {...props}>
    {children}
  </AlertDialog.Trigger>
));
AlertTrigger.displayName = AlertDialog.Trigger.displayName;

const AlertPortal = AlertDialog.Portal;

const AlertContent = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Content>
>(({ className, ...props }, ref) => (
  <AlertDialog.Portal>
    <AlertDialog.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg",
        "p-5 shadow-xl backdrop-blur-3xl border border-border",
        "focus:outline-none data-[state=open]:animate-contentShow",
        className
      )}
      {...props}
    />
  </AlertDialog.Portal>
));
AlertContent.displayName = AlertDialog.Content.displayName;

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Title>
>(({ className, ...props }, ref) => (
  <AlertDialog.Title
    ref={ref}
    className={cn(
      "text-2xl text-white bg-red-700/60 p-5 rounded-lg",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = AlertDialog.Title.displayName;

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Description>
>(({ className, ...props }, ref) => (
  <AlertDialog.Description
    ref={ref}
    className={cn("text-xl mt-2 mb-6", className)}
    {...props}
  />
));
AlertDescription.displayName = AlertDialog.Description.displayName;

const AlertCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialog.Cancel ref={ref} className={cn("", className)} {...props} />
));
AlertCancel.displayName = AlertDialog.Cancel.displayName;

const AlertConfirm = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Action>
>(({ className, ...props }, ref) => (
  <AlertDialog.Action ref={ref} className={cn("", className)} {...props} />
));
AlertConfirm.displayName = AlertDialog.Action.displayName;

export {
  Alert,
  AlertTrigger,
  AlertPortal,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertCancel,
  AlertConfirm,
};
