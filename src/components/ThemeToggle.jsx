import React from "react";

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="theme-icon">{theme === "light" ? "🌙" : "☀️"}</span>
      <span className="theme-label">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;
