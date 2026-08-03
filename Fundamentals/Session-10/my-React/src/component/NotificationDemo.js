import React from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { useTheme } from "../contexts/ThemeContext";

export default function NotificationDemo() {
  const { count, add, clear } = useNotifications();
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
      <div
        style={{
          background: dark ? "#1e3a5f" : "#eff6ff",
          border: `1px solid ${dark ? "#3b5998" : "#bfdbfe"}`,
          borderRadius: "8px",
          padding: "10px 20px",
          textAlign: "center",
          minWidth: "80px",
        }}
      >
        <div style={{ fontSize: "28px", fontWeight: 700, color: dark ? "#60a5fa" : "#2563eb" }}>
          {count}
        </div>
        <div style={{ fontSize: "11px", color: dark ? "#93c5fd" : "#6b7280", marginTop: "2px" }}>
          unread msgs
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <button
          onClick={add}
          style={{
            padding: "7px 16px",
            borderRadius: "6px",
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "13px",
          }}
        >
          + New message
        </button>
        <button
          onClick={clear}
          style={{
            padding: "7px 16px",
            borderRadius: "6px",
            border: `1px solid ${dark ? "#4b5563" : "#d1d5db"}`,
            background: "transparent",
            cursor: "pointer",
            fontSize: "13px",
            color: dark ? "#e8eaf0" : "#374151",
          }}
        >
          Mark all read
        </button>
      </div>

      {count >= 5 && (
        <span style={{ fontSize: "12px", color: "#f59e0b" }}>
          ⚠️ You have {count} unread messages!
        </span>
      )}
    </div>
  );
}
