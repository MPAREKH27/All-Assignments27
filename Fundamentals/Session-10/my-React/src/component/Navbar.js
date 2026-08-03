import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import { useNotifications } from "../contexts/NotificationContext";

export default function Navbar() {
  const { username, loggedIn } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const { count } = useNotifications();
  const dark = theme === "dark";

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "56px",
        background: dark ? "#16213e" : "#ffffff",
        borderBottom: `1px solid ${dark ? "#2a3050" : "#e5e7eb"}`,
        color: dark ? "#e8eaf0" : "#1a1a2e",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "15px" }}>⚛️ ContextAPI Demo</span>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {count > 0 && (
          <span
            style={{
              background: "#ef4444",
              color: "#fff",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 8px",
            }}
          >
            🔔 {count}
          </span>
        )}
        <span style={{ fontSize: "13px" }}>{loggedIn ? username : "Guest"}</span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: loggedIn ? "#22c55e" : "#9ca3af",
            display: "inline-block",
          }}
        />
        <button
          onClick={toggleTheme}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            border: `1px solid ${dark ? "#4b5563" : "#d1d5db"}`,
            background: "transparent",
            cursor: "pointer",
            fontSize: "12px",
            color: dark ? "#e8eaf0" : "#374151",
          }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}
