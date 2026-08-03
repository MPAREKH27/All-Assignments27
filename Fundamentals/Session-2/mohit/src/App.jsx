import React, { Component } from "react";
import { useState } from 'react'



// TASK 2 — Functional Component: UserGreeting
function UserGreeting({ username }) {
  return (
    <p className="greeting functional">
      👋 Hello, <strong>{username}</strong>!{" "}
      <span className="badge">Functional</span>
    </p>
  );
}


// TASK 3 — Class Component: UserGreetingClass
// ============================================================
class UserGreetingClass extends Component {
  render() {
    const { username } = this.props;
    return (
      <p className="greeting class-based">
        👋 Hello, <strong>{username}</strong>!{" "}
        <span className="badge">Class</span>
      </p>
    );
  }
}

// ============================================================
// TASKS 4 & 5 — MiniProfile (properly closed / wrapped JSX)
// ============================================================
function MiniProfile({ avatarUrl, name, handle, status, followers, following, posts }) {
  return (
    <article className="mini-profile">
      <div className="profile-top">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="avatar"
        />
        <div className="profile-meta">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-handle">@{handle}</p>
          <p className="profile-status">{status}</p>
          <div className="stats">
            <div className="stat">
              <span className="stat-value">{posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-value">{followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">{following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// TASK 1 — App root — renders all tasks
// ============================================================
function App() {
  return (
    <div className="app">
      {/* ── Global styles injected inline so this is a single file ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Segoe UI', system-ui, sans-serif;
          background: #0f0f0f;
          color: #f0f0f0;
          min-height: 100vh;
        }

        .app {
          max-width: 680px;
          margin: 0 auto;
          padding: 2rem 1rem 4rem;
        }

        /* ── Section cards ── */
        .section {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 16px;
          padding: 1.75rem;
          margin-bottom: 1.5rem;
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6e6e6e;
          margin-bottom: 0.5rem;
        }

        /* ── Task 1: heading ── */
        .main-heading {
          font-size: clamp(1.6rem, 5vw, 2.4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #e879f9, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.15;
        }

        /* ── Task 2 & 3: greetings ── */
        .greeting {
          font-size: 1.1rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .greeting:last-child { margin-bottom: 0; }
        .greeting.functional { background: #1e1b4b; border-left: 3px solid #818cf8; }
        .greeting.class-based { background: #1a1f2e; border-left: 3px solid #e879f9; }

        .badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.2em 0.55em;
          border-radius: 999px;
        }
        .functional .badge  { background: #312e81; color: #a5b4fc; }
        .class-based .badge { background: #4a044e; color: #f0abfc; }

        /* ── Task 4 & 5: MiniProfile ── */
        .mini-profile {
          background: #111;
          border-radius: 12px;
          overflow: hidden;
        }

        .profile-top {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid transparent;
          background:
            linear-gradient(#111, #111) padding-box,
            linear-gradient(135deg, #e879f9, #818cf8) border-box;
          flex-shrink: 0;
        }

        .profile-meta { flex: 1; min-width: 180px; }

        .profile-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #f0f0f0;
        }

        .profile-handle {
          font-size: 0.85rem;
          color: #888;
          margin: 0.15rem 0 0.5rem;
        }

        .profile-status {
          font-size: 0.9rem;
          color: #ccc;
          margin-bottom: 1rem;
          line-height: 1.45;
        }

        .stats {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f0f0f0;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .follow-btn {
          background: linear-gradient(135deg, #e879f9, #818cf8);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1.4rem;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .follow-btn:hover { opacity: 0.85; }
      `}</style>

      {/* ── TASK 1: JSX Heading ── */}
      <section className="section">
        <p className="section-label">Task 1 — JSX Heading</p>
        <h1 className="main-heading">Welcome to React JSX!</h1>
      </section>

      {/* ── TASK 2 & 3: Functional vs Class component ── */}
      <section className="section">
        <p className="section-label">Tasks 2 &amp; 3 — Functional vs Class Component</p>
        <UserGreeting username="Mohit Parekh" />
        <UserGreetingClass username="Dev" />
      </section>

      {/* ── TASKS 4 & 5: MiniProfile ── */}
      <section className="section">
        <p className="section-label">Tasks 4 &amp; 5 — MiniProfile Component</p>
        <MiniProfile
          avatarUrl="https://thumbs.dreamstime.com/b/bearded-man-working-online-laptop-computer-home-sitting-desk-businessman-office-browsing-internet-portrait-mature-214547600.jpg"
          name="Mohit Parekh"
          handle="Parekh"
          status="✨ React enthusiast | Building cool UIs one component at a time 🚀"
          posts="142"
          followers="3.8K"
          following="512"
        />
      </section>
    </div>
  );
}

export default App;
