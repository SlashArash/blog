"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

import Button from "./button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="p-2 w-9 h-9" />;

  return (
    <Button
      onClick={() =>
        setTheme((resolvedTheme ?? theme) === "dark" ? "light" : "dark")
      }
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:ring-2 transition-all"
      aria-label="Toggle Theme"
    >
      {(resolvedTheme ?? theme) === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </Button>
  );
}
