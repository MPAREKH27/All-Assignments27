import React from "react";
import { useTheme } from "../contexts/ThemeContext";

// No theme prop anywhere in this tree — only DeepChild reads context

function ThemedLayout({ children }) {
  return <div style={{ padding: "4px" }}>{children}</div>;
}

function ThemedPage({ children }) {
  return <section>{children}</section>;
}

function ThemedCard({ children }) {
  return <div style={{ marginTop: "4px" }}>{children}</div>;
}

function DeepChild() {
  const { theme } = useTheme(); // reads ThemeContext directly
  const dark = theme === "dark";

  return (
    <div
      style={{
        padding: "14px 18px",
        borderRadius: "8px",
        background: dark ? "#0d1120" : "#f0f4ff",
        color: dark ? "#b4b8e0" : "#3730a3",
        border: `1px dashed ${dark ? "#3c3c6c" : "#a5b4fc"}`,
        fontSize: "13px",
        fontWeight: 500,
      }}
    >
      ✅ <code>DeepChild</code> reads theme via <code>useContext</code>:{" "}
      <strong>"{theme}"</strong> — no props passed through Layout → Page → Card
    </div>
  );
}

export default function DeepTree() {
  return (
    <ThemedLayout>
      <ThemedPage>
        <ThemedCard>
          <DeepChild />
        </ThemedCard>
      </ThemedPage>
    </ThemedLayout>
  );
}
