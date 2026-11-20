import React from "react";
import { AnimatedThemeToggler } from "./AnimatedThemeToggler";
import "./ThemeToggle.css";

export default function ThemeToggle({
  className = "theme-toggle-nav-btn",
  variant = "circle",
  duration = 450,
  ...props
}) {
  return (
    <AnimatedThemeToggler
      className={className}
      variant={variant}
      duration={duration}
      aria-label="Toggle light or dark theme"
      title="Toggle theme"
      {...props}
    />
  );
}

export { AnimatedThemeToggler };

