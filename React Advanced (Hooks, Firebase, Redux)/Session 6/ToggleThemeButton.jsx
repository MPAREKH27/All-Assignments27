import { useTheme } from "./ThemeContext";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
        theme === "dark"
          ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
    >
      {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ToggleThemeButton;