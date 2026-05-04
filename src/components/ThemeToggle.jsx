import { useTheme } from "../contexts/ThemeContext";
import "../css/ThemeToggle.css";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
