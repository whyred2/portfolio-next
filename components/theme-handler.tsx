"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeHandler() {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    // Удаляем все классы темы
    root.classList.remove("light", "dark");

    // Добавляем текущую тему
    if (theme) {
      root.classList.add(theme);
    }
  }, [theme]);

  return null;
}
