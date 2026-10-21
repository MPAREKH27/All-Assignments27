import React from 'react';
import { Database, Server, RefreshCw, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function Navbar({ dbHealth, refreshing, onRefreshHealth }) {
  const isConnected = dbHealth && dbHealth.readyState === 1;

  return (
    <header className="glass-panel header-card">
      <div className="brand-wrapper">
        <div className="brand-logo-glow">
          <Layers size={26} />
        </div>
        <div>
          <h1 className="brand-title">MERN Stack Integration Studio</h1>
          <p className="brand-subtitle">Session 3 — Full Stack React & Node/Express & MongoDB Integration</p>
        </div>
      </div>

      <div className="badge-strip">
        <div className="status-badge" title={`Database: ${dbHealth?.database || 'mern_session3'}`}>
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <Database size={15} color={isConnected ? '#10b981' : '#f43f5e'} />
          <span>MongoDB: <strong>{isConnected ? 'Connected' : 'Offline'}</strong></span>
        </div>

        <div className="status-badge">
          <Server size={15} color="#6366f1" />
          <span>Backend: <strong>localhost:5000</strong></span>
        </div>

        {isConnected && dbHealth?.counts && (
          <div className="status-badge" style={{ borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            <span>🎵 {dbHealth.counts.playlists} Playlists</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>🍽️ {dbHealth.counts.restaurants} Restaurants</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>🎬 {dbHealth.counts.movies} Movies</span>
          </div>
        )}

        <button 
          className="btn btn-secondary btn-sm" 
          onClick={onRefreshHealth}
          disabled={refreshing}
          title="Refresh server and database health"
        >
          <RefreshCw size={14} className={refreshing ? 'spinning' : ''} />
          <span>Ping</span>
        </button>
      </div>
    </header>
  );
}
