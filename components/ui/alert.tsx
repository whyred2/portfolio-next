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

const AlertOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-overlayShow",
      className
    )}
    {...props}
  />
));

AlertOverlay.displayName = AlertDialog.Overlay.displayName;

const AlertContent = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Content>
>(({ className, ...props }, ref) => (
  <AlertDialog.Content
    ref={ref}
    className={cn(
      "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg",
      "p-3 shadow-xl bg-white/60 dark:bg-black/60 backdrop-blur-xl z-50",
      "focus:outline-none data-[state=open]:animate-contentShow",
      className
    )}
    {...props}
  />
));
AlertContent.displayName = AlertDialog.Content.displayName;

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Title>
>(({ className, ...props }, ref) => (
  <AlertDialog.Title
    ref={ref}
    className={cn(
      "text-2xl text-white bg-red-700/60 px-4 py-2 rounded-md",
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
    className={cn("text-lg mt-2 mb-6", className)}
    {...props}
  />
));
AlertDescription.displayName = AlertDialog.Description.displayName;

const AlertCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialog.Cancel
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
AlertCancel.displayName = AlertDialog.Cancel.displayName;

const AlertConfirm = React.forwardRef<
  React.ElementRef<typeof AlertDialog.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Action>
>(({ className, ...props }, ref) => (
  <AlertDialog.Action
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
AlertConfirm.displayName = AlertDialog.Action.displayName;

export {
  Alert,
  AlertTrigger,
  AlertPortal,
  AlertOverlay,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertCancel,
  AlertConfirm,
};
