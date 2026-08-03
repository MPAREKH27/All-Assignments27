import ProductCard from "./components/ProductCard";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-badge">Session 3</div>
        <h1>
          React <span className="highlight">Props</span>
        </h1>
        <p className="header-sub">
          Mastering component communication with props, defaultProps &amp;
          PropTypes
        </p>
        <div className="header-tags">
          <span className="tag">⚛️ React</span>
          <span className="tag">🔑 Props</span>
          <span className="tag">🛡️ PropTypes</span>
          <span className="tag">🔧 defaultProps</span>
        </div>
      </header>

      <main className="main-content">
        {/* ── Section 1: ProductCard ── */}
        <section className="section">
          <h2 className="section-title">
            <span className="section-num">Task 1 &amp; 4</span>
            ProductCard — Props + PropTypes Validation
          </h2>
          <p className="section-desc">
            Each card receives <code>productName</code> (string) and{" "}
            <code>price</code> (number) as props. PropTypes enforces the
            correct types.
          </p>
          <div className="cards-grid">
            <ProductCard productName="Apple MacBook Air M3" price={114900} />
            <ProductCard productName="Sony WH-1000XM5 Headphones" price={24990} />
            <ProductCard productName="Samsung Galaxy S25 Ultra" price={129999} />
          </div>
        </section>

        {/* ── Section 2: UserProfile (all props provided) ── */}
        <section className="section">
          <h2 className="section-title">
            <span className="section-num">Task 2</span>
            UserProfile — Instagram-style Cards
          </h2>
          <p className="section-desc">
            Accepts <code>username</code>, <code>followers</code>, and{" "}
            <code>profilePic</code> props and renders a mini Instagram-style
            profile card.
          </p>
          <div className="cards-grid">
            <UserProfile
              username="virat.kohli"
              followers={268000000}
              profilePic="https://ui-avatars.com/api/?name=VK&background=f97316&color=fff&size=128"
            />
            <UserProfile
              username="cristiano"
              followers={639000000}
              profilePic="https://ui-avatars.com/api/?name=CR7&background=16a34a&color=fff&size=128"
            />
            <UserProfile
              username="taylor.swift"
              followers={285000000}
              profilePic="https://ui-avatars.com/api/?name=TS&background=db2777&color=fff&size=128"
            />
          </div>
        </section>

        {/* ── Section 3: defaultProps demo ── */}
        <section className="section">
          <h2 className="section-title">
            <span className="section-num">Task 3</span>
            defaultProps — Fallback Values
          </h2>
          <p className="section-desc">
            When <code>followers</code> or <code>profilePic</code> are omitted,{" "}
            <strong>defaultProps</strong> kicks in: shows <strong>0</strong>{" "}
            followers and a generated default avatar.
          </p>
          <div className="cards-grid">
            {/* No followers, no profilePic — defaultProps apply */}
            <UserProfile username="new.user" />
            {/* Only followers provided — profilePic uses default */}
            <UserProfile username="partial.user" followers={142} />
            {/* Only profilePic provided — followers uses default (0) */}
            <UserProfile
              username="avatar.user"
              profilePic="https://ui-avatars.com/api/?name=AU&background=0ea5e9&color=fff&size=128"
            />
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>Session 3 · React Props · Fundamentals</p>
      </footer>
    </div>
  );
}

export default App;
