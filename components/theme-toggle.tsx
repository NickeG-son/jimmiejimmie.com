"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // We only mount the button on the client to avoid hydration errors
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      variant="outline"
      size="icon"
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
}
