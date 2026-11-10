import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getPreferredTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
};

export const useTheme = () => {
  // Read synchronously so the first paint matches the inline script in index.html.
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Follow the OS only while the user hasn't made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(event.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, isDarkMode: theme === "dark", toggleTheme };
};
