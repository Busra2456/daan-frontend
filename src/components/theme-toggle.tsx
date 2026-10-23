
"use client";

import { useSyncExternalStore } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled
        aria-label="Loading theme settings"
      >
        <Sun className="size-4" />
      </Button>
    );
  }

  const nextTheme =
    theme === "light"
      ? "dark"
      : theme === "dark"
        ? "system"
        : "light";

  const Icon =
    theme === "light"
      ? Sun
      : theme === "dark"
        ? Moon
        : Laptop;

  const label =
    theme === "light"
      ? "Light mode"
      : theme === "dark"
        ? "Dark mode"
        : "System theme";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Current theme: ${label}. Switch theme`}
      title={`${label} — click to switch`}
    >
      <Icon className="size-4" />
      <span className="sr-only">Switch theme</span>
    </Button>
  );
}
