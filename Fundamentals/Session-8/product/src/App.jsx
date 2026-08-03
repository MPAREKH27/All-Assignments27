import React, { useState, useRef, useEffect } from "react";

/* ================================================================== */
/* 1. SearchBar — input + button, auto-focused on mount via useRef     */
/* ================================================================== */
function SearchBar() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  // Focus the input as soon as the component mounts.
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = () => {
    alert(`Searching for: "${query}"`);
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>1. SearchBar (auto-focus on mount)</h3>
      <div style={styles.row}>
        <input
          ref={inputRef}
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/* 2. LoginForm — controlled inputs (useState) + clear/focus (useRef)  */
/* ================================================================== */
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in as "${username}"`);

    // Clear + refocus the username field after login.
    setUsername("");
    setPassword("");
    usernameRef.current.focus();
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>2. Login Form</h3>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          ref={usernameRef}
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button}>Login</button>
      </form>
    </div>
  );
}

/* ================================================================== */
/* 3. AddToPlaylist — add a song, then refocus input for the next one  */
/* ================================================================== */
function AddToPlaylist() {
  const [songName, setSongName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const inputRef = useRef(null);

  const handleAdd = () => {
    if (!songName.trim()) return;

    setPlaylist((prev) => [...prev, songName.trim()]);
    setSongName("");

    // Refocus so the user can immediately type the next song.
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>3. Add To Playlist</h3>
      <div style={styles.row}>
        <input
          ref={inputRef}
          style={styles.input}
          placeholder="Song name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button style={styles.button} onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {playlist.map((song, i) => (
          <li key={i} style={styles.listItem}>
            🎵 {song}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================== */
/* 4. FeedbackForm (refactored) — controlled inputs + focus-message    */
/* ------------------------------------------------------------------ */
/*  BEFORE (uncontrolled — reads values straight from the DOM):

      function FeedbackForm() {
        const nameRef = useRef();
        const messageRef = useRef();

        const handleSubmit = (e) => {
          e.preventDefault();
          console.log(nameRef.current.value, messageRef.current.value);
        };

        return (
          <form onSubmit={handleSubmit}>
            <input ref={nameRef} />
            <textarea ref={messageRef} />
            <button>Submit</button>
          </form>
        );
      }

    AFTER — both fields are now controlled via useState; useRef is kept
    only for the one thing state can't do: imperatively focusing the
    message textarea from a button click.
*/
function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback from ${name}: "${message}"`);
    setName("");
    setMessage("");
  };

  const focusMessage = () => {
    messageRef.current.focus();
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>4. Feedback Form (refactored)</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          ref={messageRef}
          style={{ ...styles.input, resize: "vertical", minHeight: "60px" }}
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div style={styles.row}>
          <button style={styles.button}>Submit</button>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={focusMessage}
          >
            Jump to message
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================================================================== */
/* App — renders all four demos                                        */
/* ================================================================== */
export default function App() {
  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>useRef + useState Demo</h2>
      <div style={styles.grid}>
        <SearchBar />
        <LoginForm />
        <AddToPlaylist />
        <FeedbackForm />
      </div>
    </div>
  );
}

/* ================================================================== */
/* Styles                                                               */
/* ================================================================== */
const styles = {
  page: {
    fontFamily: "system-ui, sans-serif",
    background: "#f7f7fb",
    minHeight: "100vh",
    padding: "24px",
  },
  pageTitle: { margin: "0 0 20px", color: "#1a1a1a" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e2e2e8",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  heading: { margin: "0 0 12px", fontSize: "15px", color: "#1a1a1a" },
  form: { display: "flex", flexDirection: "column", gap: "8px" },
  row: { display: "flex", gap: "8px" },
  input: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #d8d8e0",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  button: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  secondaryButton: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #2563eb",
    background: "transparent",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
  },
  list: { margin: "10px 0 0", paddingLeft: "20px" },
  listItem: { fontSize: "14px", marginBottom: "4px", color: "#333" },
};