import React, { useState, useEffect } from "react";
import axios from "axios";



/* ================================================================== */
/* 2. AddPlaylist — Axios POST with name/description + success message */
/* ================================================================== */
function AddPlaylist() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setSuccess(false);
    setError(null);

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: name,
        body: description,
      });
      setSuccess(true);
      setName("");
      setDescription("");
    } catch (err) {
      setError("Could not create playlist. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>🎵 Add Playlist</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          style={{ ...styles.input, resize: "vertical", minHeight: "60px" }}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={styles.button} disabled={submitting}>
          {submitting ? "Saving..." : "Create Playlist"}
        </button>
      </form>
      {success && (
        <p style={styles.success}>✅ Playlist created successfully!</p>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

/* ================================================================== */
/* 3. Restaurant search — Axios GET + client-side filter as you type   */
/* ================================================================== */
function RestaurantSearch() {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setRestaurants(res.data.map((u) => u.name));
      } catch (err) {
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filtered = restaurants.filter((r) =>
    r.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>🍽️ Restaurant Search</h3>
      <input
        style={styles.input}
        placeholder="Search restaurants..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p style={styles.muted}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && (
        <ul style={styles.list}>
          {filtered.length > 0 ? (
            filtered.map((name, i) => (
              <li key={i} style={styles.listItem}>
                {name}
              </li>
            ))
          ) : (
            <li style={styles.muted}>No matches found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

/* ================================================================== */
/* 5. AI-generated POST snippet, adapted for username + comment        */
/* ================================================================== */


function CommentForm() {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) return;

    setSubmitting(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        { username, comment }
      );
      setResponse(res.data);
    } catch (err) {
      setError("Could not submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>💬 Submit a Comment</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          style={{ ...styles.input, resize: "vertical", minHeight: "60px" }}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button style={styles.button} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {response && (
        <pre style={styles.responseBox}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

/* ================================================================== */
/* App — renders all sections                                          */
/* ================================================================== */
export default function App() {
  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>Axios + React Demo</h2>
      <div style={styles.grid}>
        {/* <MovieList /> */}
        <AddPlaylist />
        <RestaurantSearch />
        <CommentForm />
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
  input: {
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
    marginTop: "4px",
  },
  list: { margin: "8px 0 0", paddingLeft: "20px" },
  listItem: { fontSize: "14px", marginBottom: "4px", color: "#333" },
  muted: { fontSize: "13px", color: "#888" },
  error: { fontSize: "13px", color: "#dc2626", marginTop: "8px" },
  success: { fontSize: "13px", color: "#16a34a", marginTop: "8px" },
  responseBox: {
    marginTop: "10px",
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "12px",
    maxHeight: "160px",
    overflow: "auto",
  },
};