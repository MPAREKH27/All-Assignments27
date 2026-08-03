import { useThemeContext } from "./ThemeContext";

function ThemeHeader() {
  const { mode, toggleTheme } = useThemeContext();

  const bg = mode === "dark" ? "bg-gray-900" : "bg-white";
  const text = mode === "dark" ? "text-white" : "text-gray-900";

  return (
    <header className={`${bg} ${text} w-full max-w-2xl rounded-2xl shadow-2xl px-6 py-4 flex justify-between items-center`}>
      <div>
        <h1 className="text-xl font-bold">Theme Toggle App</h1>
        <p className="text-xs opacity-60">Current theme: {mode}</p>
      </div>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
          mode === "dark"
            ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {mode === "dark" ? "☀ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}

export default ThemeHeader;