import { useTheme } from "./ThemeContext";
import ToggleThemeButton from "./ToggleThemeButton";

function Navbar() {
  const { theme } = useTheme();

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const text = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <nav
      className={`${bg} ${text} w-full max-w-2xl rounded-2xl shadow-2xl px-6 py-4 flex justify-between items-center`}
    >
      <h1 className="text-xl font-bold">InstaTheme</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm opacity-70">Theme: {theme}</span>
        <ToggleThemeButton />
      </div>
    </nav>
  );
}

export default Navbar;