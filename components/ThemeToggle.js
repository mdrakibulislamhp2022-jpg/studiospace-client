"use client";

import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "studiodark" ? "studiolight" : "studiodark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("studiospace-theme", next);
    } catch (error) {
      // storage may be unavailable; the theme still changes for this visit
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle light and dark theme"
    >
      <FiMoon className="theme-moon h-5 w-5" />
      <FiSun className="theme-sun h-5 w-5" />
    </button>
  );
}