import React, { createContext, useContext, useState } from "react";


 
const UserContext = createContext({
  username: "guest_user",
  loggedIn: false,
});

 
/* 2. Navbar —          */

function Navbar() {
  const { username, loggedIn } = useContext(UserContext);

  return (
    <nav style={styles.navbar}>
      <span style={styles.logo}>MyApp</span>
      <span style={styles.userInfo}>
        {loggedIn ? `👋 ${username}` : "Not logged in"}
      </span>
    </nav>
  );
}

/* ================================================================== */
/* 3. ThemeContext + toggle button — light/dark theme via Context API  */
/* ================================================================== */
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button style={styles.toggleBtn} onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

/* ================================================================== */
/* 4. Prop-drilling refactor                                           */
/* ------------------------------------------------------------------ */
/*  BEFORE (theme passed down through every level as a prop):

      function Page({ theme }) {
        return <Section theme={theme} />;
      }
      function Section({ theme }) {
        return <Card theme={theme} />;
      }
      function Card({ theme }) {
        return <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                 Themed text
               </p>;
      }

    AFTER (only the deepest child touches useContext — no theme prop
    anywhere in between):
*/
function Page() {
  return <Section />;
}

function Section() {
  return <Card />;
}

function Card() {
  const { theme } = useContext(ThemeContext); // <- only place theme is read
  return (
    <div
      style={{
        ...styles.card,
        background: theme === "dark" ? "#2a2a35" : "#fff",
        color: theme === "dark" ? "#f0f0f0" : "#1a1a1a",
      }}
    >
      <p style={{ margin: 0 }}>
        I'm the deepest child (Card). No <code>theme</code> prop was
        passed to <code>Page</code> or <code>Section</code> — I pulled it
        straight from context.
      </p>
    </div>
  );
}

/* ================================================================== */
/* 5. NotificationContext — unread-count demo (WhatsApp-style badge)   */
/* ------------------------------------------------------------------ */
/*  AI-generated starting snippet (the kind ChatGPT/Copilot would give
    you), then adapted to fit this demo:

      const NotificationContext = createContext();

      export function NotificationProvider({ children }) {
        const [count, setCount] = useState(0);
        const addNotification = () => setCount((c) => c + 1);
        const clearNotifications = () => setCount(0);
        return (
          <NotificationContext.Provider
            value={{ count, addNotification, clearNotifications }}
          >
            {children}
          </NotificationContext.Provider>
        );
      }

      export const useNotifications = () => useContext(NotificationContext);
*/
const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [count, setCount] = useState(3); // pretend 3 unread on load

  const addNotification = () => setCount((c) => c + 1);
  const clearNotifications = () => setCount(0);

  return (
    <NotificationContext.Provider
      value={{ count, addNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

function NotificationBell() {
  const { count, addNotification, clearNotifications } =
    useContext(NotificationContext);

  return (
    <div style={styles.bellRow}>
      <div style={styles.bellWrap}>
        <span style={{ fontSize: "22px" }}>🔔</span>
        {count > 0 && <span style={styles.badge}>{count}</span>}
      </div>
      <button style={styles.smallBtn} onClick={addNotification}>
        New message
      </button>
      <button style={styles.smallBtn} onClick={clearNotifications}>
        Mark all read
      </button>
    </div>
  );
}

/* ================================================================== */
/* App — wires everything together                                     */
/* ================================================================== */
export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  const currentUser = { username: "sara_codes", loggedIn: true };

  return (
    <UserContext.Provider value={currentUser}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <NotificationProvider>
          <div
            style={{
              ...styles.page,
              background: theme === "dark" ? "#1a1a22" : "#f7f7fb",
              color: theme === "dark" ? "#f0f0f0" : "#1a1a1a",
            }}
          >
            <Navbar />

            <section style={styles.section}>
              <h3 style={styles.heading}>3. Theme toggle (Context API)</h3>
              <ThemeToggleButton />
              <p style={styles.hint}>Current theme: {theme}</p>
            </section>

            <section style={styles.section}>
              <h3 style={styles.heading}>
                4. Prop-drilling refactor (Page → Section → Card)
              </h3>
              <Page />
            </section>

            <section style={styles.section}>
              <h3 style={styles.heading}>
                5. Notification count context (WhatsApp-style)
              </h3>
              <NotificationBell />
            </section>
          </div>
        </NotificationProvider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

/* ================================================================== */
/* Styles                                                               */
/* ================================================================== */
const styles = {
  page: {
    fontFamily: "system-ui, sans-serif",
    minHeight: "100vh",
    padding: "0 0 32px",
    transition: "background 0.2s ease, color 0.2s ease",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    background: "#2563eb",
    color: "#fff",
  },
  logo: { fontWeight: 700, fontSize: "18px" },
  userInfo: { fontSize: "14px" },
  section: {
    padding: "20px 24px",
    borderBottom: "1px solid rgba(128,128,128,0.2)",
  },
  heading: { margin: "0 0 12px", fontSize: "15px" },
  hint: { fontSize: "13px", opacity: 0.7, marginTop: "8px" },
  toggleBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #2563eb",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  card: {
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid rgba(128,128,128,0.2)",
  },
  bellRow: { display: "flex", alignItems: "center", gap: "12px" },
  bellWrap: { position: "relative" },
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    background: "#e11d48",
    color: "#fff",
    borderRadius: "999px",
    fontSize: "11px",
    padding: "1px 6px",
    fontWeight: 700,
  },
  smallBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid rgba(128,128,128,0.4)",
    background: "transparent",
    color: "inherit",
    cursor: "pointer",
    fontSize: "13px",
  },
};