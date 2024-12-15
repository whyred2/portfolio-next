"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { HeaderItem, NavigationItem } from "@/components/ui/header-items";
import { Icons } from "@/components/icons";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <HeaderItem>
        <div className="animate-pulse w-10 h-10 rounded-full bg-secondary" />
      </HeaderItem>
    );
  }

  return (
    <HeaderItem>
      <NavigationItem
        onClick={toggleTheme}
        className={`
                    icon-wrapper relative w-10 h-10
                    ${theme === "dark" ? "dark" : "light"}
                  `}
      >
        <Icons.sun
          className="sun absolute transition-transform duration-300"
          size={24}
        />
        <Icons.moon
          className="moon absolute transition-transform duration-300"
          size={24}
        />
      </NavigationItem>
    </HeaderItem>
  );
}
