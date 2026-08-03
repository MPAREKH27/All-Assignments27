import React, { useState, useEffect, useCallback } from "react";

/* ============================================================
   MOCK of firebase/firestore
   ------------------------------------------------------------
   Same function names/signatures as the real SDK:
     collection(db, "restaurants")
     addDoc(colRef, data)
     getDocs(colRef) -> { docs: [{ id, data() }] }
   Swap this block for:
     import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
   and nothing else below changes.
   ============================================================ */

// in-memory "Firestore" — pre-seeded with a couple of documents
let restaurantDocs = [
  { id: "doc_1", data: { name: "Spice Villa", cuisine: "Indian" } },
  { id: "doc_2", data: { name: "Curry House", cuisine: "Indian" } },
  { id: "doc_3", data: { name: "Bella Napoli", cuisine: "Italian" } },
  { id: "doc_4", data: { name: "Golden Dragon", cuisine: "Chinese" } },
];
let nextId = 5;

function collection(db, path) {
  return { path }; // just carries the collection name
}

function addDoc(colRef, data) {
  return new Promise((resolve) =>
    setTimeout(() => {
      const id = "doc_" + nextId++;
      restaurantDocs.push({ id, data });
      resolve({ id });
    }, 300)
  );
}

function getDocs(colRef) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        docs: restaurantDocs.map((d) => ({ id: d.id, data: () => d.data })),
      });
    }, 300)
  );
}

const db = {}; // stand-in for getFirestore(app)

/* ============================================================
   AddRestaurant.js
   ============================================================ */
const AddRestaurant = ({ onAdded, onLog }) => {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !cuisine.trim()) return;
    setSaving(true);
    onLog(`addDoc(collection(db, "restaurants"), { name: "${name}", cuisine: "${cuisine}" }) called…`);
    const { id } = await addDoc(collection(db, "restaurants"), {
      name: name.trim(),
      cuisine: cuisine.trim(),
    });
    onLog(`✅ Document written with id: ${id}`);
    setName("");
    setCuisine("");
    setSaving(false);
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-800">Add a Restaurant</h2>
      <div className="flex gap-2">
        <input
          placeholder="Restaurant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          required
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        <button
          disabled={saving}
          className="px-4 rounded-lg bg-emerald-600 text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Saving…" : "Add"}
        </button>
      </div>
    </form>
  );
};

/* ============================================================
   RestaurantList.js — getDocs fetch + client-side cuisine filter
   ============================================================ */
const RestaurantList = ({ onLog }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cuisineFilter, setCuisineFilter] = useState("");

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    onLog(`getDocs(collection(db, "restaurants")) called…`);
    const snapshot = await getDocs(collection(db, "restaurants"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    onLog(`✅ Fetched ${data.length} document(s)`);
    setRestaurants(data);
    setLoading(false);
  }, [onLog]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filtered = restaurants.filter((r) =>
    r.cuisine.toLowerCase().includes(cuisineFilter.trim().toLowerCase())
  );

  return (
    <div className="space-y-3">
      <AddRestaurant onAdded={fetchRestaurants} onLog={onLog} />

      <div>
        <h2 className="text-sm font-semibold text-zinc-800 mb-1">Filter by cuisine</h2>
        <input
          placeholder="e.g. Italian, Chinese…"
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="rounded-lg border border-zinc-100 bg-zinc-50 divide-y divide-zinc-100">
        {loading && <p className="p-3 text-sm text-zinc-400">Loading restaurants…</p>}
        {!loading && filtered.length === 0 && (
          <p className="p-3 text-sm text-zinc-400">No restaurants match "{cuisineFilter}".</p>
        )}
        {!loading &&
          filtered.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="font-medium text-zinc-800">{r.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-600">{r.cuisine}</span>
            </div>
          ))}
      </div>
      <p className="text-xs text-zinc-400">
        Showing {filtered.length} of {restaurants.length} restaurant(s)
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
  const addLog = useCallback((line) => setLog((prev) => [...prev.slice(-30), line]), []);

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 mb-1">Restaurants (Firestore, mocked)</h1>
          <p className="text-sm text-zinc-500">
            4 restaurants pre-seeded — add one, then try filtering by cuisine.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <RestaurantList onLog={addLog} />
        </div>
        <ConsolePanel log={log} />
      </div>
    </div>
  );
}