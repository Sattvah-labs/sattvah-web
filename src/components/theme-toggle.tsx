"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Theme toggle.
 *
 * Reads + writes 'sattvah-theme' from localStorage; toggles the 'dark'
 * class on <html>. Default theme (dark) is applied by an inline script
 * in layout.tsx so the initial HTML paints in the correct theme without
 * flashing.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Sync from DOM on mount — the inline script in layout has already
  // set the right class by the time this runs.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("sattvah-theme", next);
    } catch {
      /* private mode etc — silently no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground hover:-rotate-12"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
