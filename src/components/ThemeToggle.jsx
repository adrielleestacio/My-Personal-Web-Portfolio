import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = ({ className }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "rounded-full p-2 text-foreground/80 transition-colors duration-300",
        "hover:bg-secondary hover:text-primary",
        className
      )}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </button>
  );
};
