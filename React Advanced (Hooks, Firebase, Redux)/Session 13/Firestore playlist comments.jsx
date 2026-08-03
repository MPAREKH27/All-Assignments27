import React, { useState, useEffect, useCallback, useRef } from "react";

/* ============================================================
   MOCK of firebase/firestore
   ------------------------------------------------------------
   Same signatures as the real SDK for: doc, getDoc, updateDoc,
   deleteDoc, collection, query, where, orderBy, onSnapshot.
   Swap for real `firebase/firestore` imports and nothing below
   changes.
   ============================================================ */

let playlistDocs = {
  playlist_1: { name: "Road Trip Anthems" },
};

let commentDocs = [
  { id: "c1", songId: "song_1", author: "maya", text: "This bridge gives me chills 😭", createdAt: 3 },
  { id: "c2", songId: "song_1", author: "leo", text: "on repeat all week", createdAt: 2 },
  { id: "c3", songId: "song_1", author: "priya", text: "the bassline though", createdAt: 1 },
];
let nextCommentId = 4;
const commentListeners = new Set(); // simulates Firestore's live listener registry

function doc(db, collectionName, id) {
  return { collectionName, id };
}

function getDoc(ref) {
  return new Promise((resolve) =>
    setTimeout(() => {
      const data = playlistDocs[ref.id];
      resolve({ exists: () => !!data, data: () => data });
    }, 250)
  );
}

function updateDoc(ref, fields) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (!playlistDocs[ref.id]) {
        reject(new Error("No document to update."));
        return;
      }
      playlistDocs[ref.id] = { ...playlistDocs[ref.id], ...fields };
      resolve();
    }, 250)
  );
}

function deleteDoc(ref) {
  return new Promise((resolve) =>
    setTimeout(() => {
      delete playlistDocs[ref.id];
      resolve();
    }, 250)
  );
}

function collection() { return {}; }
function query(colRef, ...clauses) { return { clauses }; }
function where(field, op, value) { return { type: "where", field, op, value }; }
function orderBy(field, dir) { return { type: "orderBy", field, dir }; }

function notifyCommentListeners() {
  commentListeners.forEach(({ songId, callback }) => {
    const filtered = commentDocs
      .filter((c) => c.songId === songId)
      .sort((a, b) => b.createdAt - a.createdAt);
    callback({ docs: filtered.map((c) => ({ id: c.id, data: () => c })) });
  });
}

function onSnapshot(q, callback) {
  const songId = q.clauses.find((c) => c.type === "where")?.value;
  const entry = { songId, callback };
  commentListeners.add(entry);
  notifyCommentListeners(); // fire immediately with current data, like the real SDK
  return () => commentListeners.delete(entry); // unsubscribe fn
}

// Simulates another user posting a comment from elsewhere
function simulateIncomingComment(songId) {
  const samples = [
    { author: "jordan", text: "who produced this??" },
    { author: "sam", text: "concert when 🙏" },
    { author: "ari", text: "lyrics hit different at 2am" },
  ];
  const pick = samples[Math.floor(Math.random() * samples.length)];
  commentDocs.push({ id: "c" + nextCommentId++, songId, ...pick, createdAt: Date.now() });
  notifyCommentListeners();
}

const db = {};

/* ============================================================
   PlaylistEditor.js
   ============================================================ */
const PlaylistEditor = ({ playlistId, onDeleted, onLog }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "playlists", playlistId)).then((snap) => {
      if (snap.exists()) setName(snap.data().name);
      setLoading(false);
    });
  }, [playlistId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    onLog(`updateDoc(doc(db, "playlists", "${playlistId}"), { name: "${name}" }) called…`);
    await updateDoc(doc(db, "playlists", playlistId), { name: name.trim() });
    onLog("✅ Playlist updated");
    setSaved(true);
    setSaving(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete playlist "${name}"? This can't be undone.`);
    onLog(`window.confirm(...) → ${confirmed}`);
    if (!confirmed) return;
    onLog(`deleteDoc(doc(db, "playlists", "${playlistId}")) called…`);
    await deleteDoc(doc(db, "playlists", playlistId));
    onLog("✅ Playlist deleted");
    setDeleted(true);
    onDeleted?.();
  };

  if (loading) return <p className="text-sm text-zinc-400">Loading playlist…</p>;
  if (deleted) return <p className="text-sm text-zinc-400 italic">Playlist deleted.</p>;

  return (
    <form onSubmit={handleUpdate} className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-800">Edit Playlist</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      />
      <div className="flex gap-2">
        <button disabled={saving} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium disabled:opacity-50">
          {saving ? "Saving…" : "Save Changes"}
        </button>
        <button type="button" onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
          Delete Playlist
        </button>
      </div>
      {saved && <p className="text-xs text-emerald-600">Playlist updated!</p>}
    </form>
  );
};

/* ============================================================
   LiveCommentsFeed.js — onSnapshot + cleanup on unmount
   ============================================================ */
const LiveCommentsFeed = ({ songId, onLog }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onLog(`onSnapshot(query(comments, where("songId","==","${songId}"))) subscribed…`);
    const q = query(collection(db, "comments"), where("songId", "==", songId), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setComments(data);
      setLoading(false);
      onLog(`onSnapshot fired → ${data.length} comment(s)`);
    });

    // AI-generated cleanup pattern
    return () => {
      unsubscribe();
      onLog("🧹 unsubscribe() called on unmount/dependency change");
    };
  }, [songId, onLog]);

  if (loading) return <p className="text-sm text-zinc-400">Loading comments…</p>;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-800">Live Comments</h2>
        <button
          onClick={() => {
            simulateIncomingComment(songId);
            onLog("👤 (simulated) another user posted a comment");
          }}
          className="text-xs px-2 py-1 rounded-lg bg-zinc-900 text-white font-medium"
        >
          Simulate incoming comment
        </button>
      </div>
      {comments.length === 0 && <p className="text-sm text-zinc-400">No comments yet — be the first!</p>}
      <ul className="space-y-1">
        {comments.map((c) => (
          <li key={c.id} className="text-sm bg-zinc-50 rounded-lg px-3 py-2">
            <span className="font-medium text-zinc-800">{c.author}:</span> {c.text}
          </li>
        ))}
      </ul>
      <p className="text-xs text-zinc-400">
        No refresh needed — click "Simulate incoming comment" to see it appear instantly.
      </p>
    </div>
  );
};

/* ============================================================
   App
   ============================================================ */
const ConsolePanel = ({ log }) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">console output</p>
    <div className="font-mono text-xs text-emerald-400 space-y-1 max-h-40 overflow-y-auto">
      {log.length === 0 && <p className="text-zinc-600">// waiting for firestore calls…</p>}
      {log.map((line, i) => (
        <p key={i}><span className="text-zinc-600">{`>`}</span> {line}</p>
      ))}
    </div>
  </div>
);

export default function App() {
  const [log, setLog] = useState([]);
  const [showFeed, setShowFeed] = useState(true);
  const addLog = useCallback((line) => setLog((prev) => [...prev.slice(-40), line]), []);

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 mb-1">Playlist &amp; Live Comments</h1>
          <p className="text-sm text-zinc-500">Firestore update/delete + onSnapshot, mocked.</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <PlaylistEditor playlistId="playlist_1" onLog={addLog} />
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest opacity-60">Song: Midnight Drive</span>
            <button
              onClick={() => setShowFeed((s) => !s)}
              className="text-xs px-2 py-1 rounded-lg border border-zinc-200 text-zinc-600"
            >
              {showFeed ? "Unmount feed" : "Mount feed"}
            </button>
          </div>
          {showFeed && <LiveCommentsFeed songId="song_1" onLog={addLog} />}
          {!showFeed && (
            <p className="text-xs text-zinc-400 italic">
              Feed unmounted — check the console for the cleanup log.
            </p>
          )}
        </div>

        <ConsolePanel log={log} />
      </div>
    </div>
  );
}