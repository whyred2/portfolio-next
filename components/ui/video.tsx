import * as React from "react";
import * as Slider from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const PlayerButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-2 items-center rounded-sm bg-white/20 h-full px-2 backdrop-blur-md transition-colors",
        className
      )}
      {...props}
    />
  );
});
PlayerButton.displayName = PlayerButton.displayName;

const PlayerSlider = React.forwardRef<
  React.ElementRef<typeof Slider.Root>,
  React.ComponentPropsWithoutRef<typeof Slider.Root>
>(({ className, ...props }, ref) => (
  <Slider.Root
    ref={ref}
    className={cn(
      "relative flex h-4 w-full touch-none select-none items-center",
      className
    )}
    step={0.1}
    {...props}
  >
    <Slider.Track className="relative h-full grow rounded bg-black/60 overflow-hidden">
      <Slider.Range className="absolute h-full bg-white/80" />
    </Slider.Track>
  </Slider.Root>
));
PlayerSlider.displayName = Slider.Root.displayName;

export { PlayerButton, PlayerSlider };
