"use client";

import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function ThemeMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Не удалось воспроизвести музыку:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (theme !== "new-year" && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [theme]);

  if (theme !== "new-year") {
    return null;
  }

  return (
    <div className="absolute bottom-10 left-10">
      <audio ref={audioRef} src="/audio/2024xmas.mp3" loop />
      <button
        onClick={togglePlay}
        className={cn(
          buttonVariants({ variant: "secondary" }),
          `h-12 w-12 p-0 ${isPlaying ? "bg-active" : ""}`
        )}
      >
        {isPlaying ? (
          <Icons.music2 className="animate-spin" />
        ) : (
          <Icons.music2 />
        )}
      </button>
    </div>
  );
}
