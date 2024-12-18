import * as React from "react";

import {
  Alert,
  AlertTrigger,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertCancel,
  AlertConfirm,
} from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

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
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <div className="flex justify-end gap-3">
          <AlertCancel className={buttonVariants({ variant: "secondary" })}>
            Cancel
          </AlertCancel>
          <AlertConfirm
            onClick={onConfirm}
            className={buttonVariants({ variant: "delete" })}
          >
            Confirm
          </AlertConfirm>
        </div>
      </AlertContent>
    </Alert>
  );
};

export { AlertHandler };
