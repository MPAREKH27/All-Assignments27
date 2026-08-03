import TrendingSongs from "./components/TrendingSongs";
import IPLScoreFetcher from "./components/IPLScoreFetcher";
import MovieSuggestions from "./components/MovieSuggestions";
import DataFetcher from "./components/DataFetcher";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-badge">Session 7</div>
        <h1>React <span className="highlight">useEffect</span> Hook</h1>
        <p className="header-sub">
          Exploring lifecycle behaviour with 4 hands-on tasks
        </p>
        <div className="header-tags">
          <span className="tag">⚛️ React</span>
          <span className="tag">🪝 useEffect</span>
          <span className="tag">📡 Fetch API</span>
          <span className="tag">⏳ Loading State</span>
        </div>
      </header>

      {/* ── Main Grid ── */}
      <main className="main-grid">
        <TrendingSongs />
        <IPLScoreFetcher />
        <MovieSuggestions />
        <DataFetcher />
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>Session 7 · React useEffect Hook · Fundamentals</p>
      </footer>
    </div>
  );
}

export default App;
