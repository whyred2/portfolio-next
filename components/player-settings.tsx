import * as React from "react";
import {
  PlayerMenu,
  PlayerMenuItem,
  PlayerMenuRadioGroup,
  PlayerMenuRadioItem,
} from "@/components/ui/player-menu";
import { cn } from "@/lib/utils";

interface PlayerSettingsProps {
  className?: string;
  videoSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export function PlayerSettings({
  className,
  videoSpeed,
  onSpeedChange,
}: PlayerSettingsProps) {
  const [isSpeedOpen, setSpeedOpen] = React.useState<boolean>(false);
  const [speed, setSpeed] = React.useState<number>(videoSpeed);

  const settingsContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        settingsContainerRef.current &&
        !settingsContainerRef.current.contains(e.target as Node)
      ) {
        setSpeedOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setSpeed(videoSpeed);
  }, [videoSpeed]);

  return (
    <div className={cn("absolute bottom-0 right-0", className)}>
      <div ref={settingsContainerRef}>
        <PlayerMenu
          className={cn(
            "transition-transform ease-in-out duration-300",
            isSpeedOpen && `-translate-x-[208px]`
          )}
        >
          <PlayerMenuItem
            onClick={() => setSpeedOpen(!isSpeedOpen)}
            checked={isSpeedOpen}
          >
            <div>Скорость</div>
            <div>{speed}x</div>
          </PlayerMenuItem>
        </PlayerMenu>

        <PlayerMenuRadioGroup
          className={cn(
            !isSpeedOpen && "translate-x-[calc(100%+8px)]",
            "transition-transform ease-in-out duration-300"
          )}
          value={speed}
          onValueChange={(val) => {
            const newSpeed = Number(val);
            setSpeed(newSpeed);
            onSpeedChange(newSpeed);
          }}
        >
          <PlayerMenuRadioItem value="0.25">0.25</PlayerMenuRadioItem>
          <PlayerMenuRadioItem value="0.50">0.5</PlayerMenuRadioItem>
          <PlayerMenuRadioItem value="0.75">0.75</PlayerMenuRadioItem>
          <PlayerMenuRadioItem value="1">Обычная</PlayerMenuRadioItem>
          <PlayerMenuRadioItem value="1.25">1.25</PlayerMenuRadioItem>
          <PlayerMenuRadioItem value="1.5">1.5</PlayerMenuRadioItem>
          <PlayerMenuRadioItem value="2">2</PlayerMenuRadioItem>
        </PlayerMenuRadioGroup>
      </div>
    </div>
  );
}
