import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronRight, Check } from "lucide-react";

interface PlayerMenuProps extends React.HTMLAttributes<HTMLDivElement> {}
interface PlayerMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
}
interface PlayerMenuRadioGroupProps
  extends React.HTMLAttributes<HTMLFormElement> {
  value?: number;
  onValueChange?: (val: number) => void;
}
interface PlayerMenuRadioItemProps
  extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
}

const PlayerMenu = React.forwardRef<HTMLDivElement, PlayerMenuProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-sm overflow-hidden w-[250px] text-md bg-neutral-500/60 backdrop-blur-md user-select-none",
          "absolute bottom-10 right-0",
          className
        )}
        {...props}
      />
    );
  }
);
PlayerMenu.displayName = "PlayerMenu";

const PlayerMenuItem = React.forwardRef<HTMLDivElement, PlayerMenuItemProps>(
  ({ className, children, checked, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-between px-4 pr-12 h-[50px]",
          " hover:bg-white/20 active:bg-active",
          "active:transition-none transition-colors duration-300",
          checked ? "bg-active hover:bg-active" : "",
          className
        )}
        {...props}
      >
        {children}
        <ChevronRight
          className={cn(
            "absolute right-4",
            "ml-auto transition-transform ease-in-out duration-500",
            checked && "rotate-180"
          )}
        />
      </div>
    );
  }
);

PlayerMenuItem.displayName = "PlayerMenuItem";

const PlayerMenuRadioGroup = React.forwardRef<
  HTMLFormElement,
  PlayerMenuRadioGroupProps
>(({ className, children, value, onValueChange, ...props }, ref) => {
  const groupName = React.useId();

  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const stringVal = child.props.value as string | undefined;
    if (!stringVal) return child;

    const parsedVal = parseFloat(stringVal);

    const newProps = {
      name: groupName,
      checked: parsedVal === (value ?? 0),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange?.(parseFloat(e.target.value));
      },
    };

    return React.cloneElement(child, newProps);
  });

  return (
    <form
      ref={ref}
      className={cn(
        "w-[200px] bg-neutral-500/60 rounded-sm overflow-hidden backdrop-blur-md user-select-none",
        "absolute bottom-10 right-0",
        className
      )}
      {...props}
    >
      {clonedChildren}
    </form>
  );
});
PlayerMenuRadioGroup.displayName = "PlayerMenuRadioGroup";

const PlayerMenuRadioItem = React.forwardRef<
  HTMLInputElement,
  PlayerMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <label
    className={cn(
      "relative flex items-center px-4 h-[50px] w-full cursor-pointer",
      "hover:bg-white/20 active:bg-active",
      "transition-colors duration-300",
      className
    )}
  >
    <input
      ref={ref}
      type="radio"
      className={cn("peer appearance-none")}
      {...props}
    />
    <Check className="absolute right-4 text-transparent peer-checked:text-white" />
    {children}
  </label>
));
PlayerMenuRadioItem.displayName = "PlayerMenuRadioItem";

export {
  PlayerMenu,
  PlayerMenuItem,
  PlayerMenuRadioGroup,
  PlayerMenuRadioItem,
};
