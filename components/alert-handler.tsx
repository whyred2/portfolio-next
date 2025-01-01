import * as React from "react";

import {
  Alert,
  AlertTrigger,
  AlertPortal,
  AlertOverlay,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertCancel,
  AlertConfirm,
} from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertHandlerProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  onConfirm: () => void;
}

const AlertHandler = ({
  title,
  description,
  trigger,
  onConfirm,
}: AlertHandlerProps) => {
  return (
    <Alert>
      <AlertTrigger asChild>{trigger}</AlertTrigger>
      <AlertPortal>
        <AlertOverlay />

        <AlertContent>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
          <div className="flex justify-end gap-3">
            <AlertCancel
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "rounded-md"
              )}
            >
              Отмена
            </AlertCancel>
            <AlertConfirm
              onClick={onConfirm}
              className={cn(
                buttonVariants({ variant: "delete", size: "sm" }),
                "rounded-md"
              )}
            >
              Подтвердить
            </AlertConfirm>
          </div>
        </AlertContent>
      </AlertPortal>
    </Alert>
  );
};

export { AlertHandler };
