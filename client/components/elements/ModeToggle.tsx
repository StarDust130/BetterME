"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is only rendered after the theme has been initialized
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until the theme is initialized
  }

  const handleThemeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      <div className="relative transition-all duration-300">
        <label className="theme-switch">
          <input
            type="checkbox"
            className="theme-switch__checkbox"
            checked={theme === "dark"}
            onChange={handleThemeToggle}
          />
          <div className="theme-switch__container">
            <div className="theme-switch__clouds"></div>
            <div className="theme-switch__stars-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 144 55"
                fill="none"
              >
                {/* SVG content */}
              </svg>
            </div>
            <div className="theme-switch__circle-container">
              <div className="theme-switch__sun-moon-container">
                <div className="theme-switch__moon">
                  <div className="theme-switch__spot"></div>
                  <div className="theme-switch__spot"></div>
                  <div className="theme-switch__spot"></div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
