import React, { useState, useEffect } from 'react';
import { Music, PlusCircle, CheckCircle2, ListMusic, Calendar, Sparkles } from 'lucide-react';

export default function Task1Playlist({ onShowAlert, onLogApi }) {
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [lastSuccessMsg, setLastSuccessMsg] = useState('');

  // Fetch playlists from backend
  const fetchPlaylists = async () => {
    setFetching(true);
    const start = Date.now();
    try {
      const res = await fetch('http://localhost:5000/playlists');
      const duration = Date.now() - start;
      const data = await res.json();
      
      onLogApi?.({
        method: 'GET',
        url: '/playlists',
        status: res.status,
        duration,
        data
      });

      if (res.ok && data.playlists) {
        setPlaylists(data.playlists);
      } else {
        onShowAlert({ type: 'error', message: data.error || 'Failed to fetch playlists' });
      }
    } catch (err) {
      onShowAlert({ type: 'error', message: `Network error connecting to backend: ${err.message}` });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // Handle form submission (Task 1: sends POST request with playlist name)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playlistName.trim()) {
      onShowAlert({ type: 'error', message: 'Please enter a valid playlist name.' });
      return;
    }

    setLoading(true);
    const start = Date.now();

    try {
      const response = await fetch('http://localhost:5000/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playlistName.trim() })
      });

      const duration = Date.now() - start;
      const data = await response.json();

      onLogApi?.({
        method: 'POST',
        url: '/playlists',
        status: response.status,
        duration,
        data
      });

      if (!response.ok) {
        // Task 4: Backend error handling - display alert with error
        onShowAlert({
          type: 'error',
          message: data.error || 'Failed to save playlist to MongoDB'
        });
        return;
      }

      // Task 1: Success message returned from backend
      setLastSuccessMsg(data.message);
      onShowAlert({
        type: 'success',
        message: data.message
      });

      // Clear input and append new playlist to list
      setPlaylistName('');
      if (data.playlist) {
        setPlaylists(prev => [data.playlist, ...prev]);
      }
    } catch (err) {
      // Task 4: Network / connection failure
      onShowAlert({
        type: 'error',
        message: `Connection Error: Could not reach Node backend (${err.message})`
      });
    } finally {
      setLoading(false);
    }
  };

  // Quick suggestions for playlists
  const suggestions = ['Chillhop Study Beats', 'Synthwave Night Drive', 'Deep Focus & Flow', 'Acoustic Sunday Vibes', 'Gym Workout Energy'];

  return (
    <div className="task-container">
      <div className="task-section-header">
        <div>
          <span className="task-pill">Task 1 & Task 4 & Task 5</span>
          <h2>Playlist MERN Flow</h2>
          <p className="task-desc">
            Submits a new playlist name via <code>POST /playlists</code>. The Node backend saves it to MongoDB 
            using Mongoose via <code>async/await</code> and returns a success confirmation message.
          </p>
        </div>
      </div>

      <div className="grid-2col">
        {/* Creation Form */}
        <div className="glass-panel form-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PlusCircle size={20} color="#6366f1" />
            Create New Playlist
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="playlist-input">
                Playlist Name
              </label>
              <input
                id="playlist-input"
                type="text"
                className="form-input"
                placeholder="e.g. Late Night Coding Vibes"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quick ideas:</span>
              <div className="pill-group">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quick-pill"
                    onClick={() => setPlaylistName(item)}
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="submit-playlist-btn"
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <>Saving to MongoDB...</>
              ) : (
                <>
                  <Music size={18} />
                  Send POST Request to Backend
                </>
              )}
            </button>
          </form>

          {lastSuccessMsg && (
            <div style={{
              marginTop: '18px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.86rem',
              color: '#6ee7b7'
            }}>
              <CheckCircle2 size={18} color="#10b981" />
              <div>
                <strong>Backend Response:</strong>
                <div>{lastSuccessMsg}</div>
              </div>
            </div>
          )}
        </div>

        {/* Existing Playlists Display */}
        <div className="glass-panel form-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ListMusic size={20} color="#a855f7" />
              Saved Playlists ({playlists.length})
            </h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={fetchPlaylists}
              disabled={fetching}
            >
              Refresh
            </button>
          </div>

          {playlists.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Music size={36} style={{ opacity: 0.3, marginBottom: '10px' }} />
              <p>No playlists found in MongoDB yet.</p>
              <p style={{ fontSize: '0.82rem' }}>Create your first playlist using the form on the left!</p>
            </div>
          ) : (
            <div className="card-list">
              {playlists.map((pl, idx) => (
                <div key={pl._id || idx} className={`card-item ${idx === 0 ? 'newly-added' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#a5b4fc',
                      border: '1px solid rgba(99,102,241,0.25)'
                    }}>
                      <Music size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.96rem', color: '#ffffff' }}>{pl.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        <Calendar size={12} />
                        <span>{new Date(pl.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        <span>•</span>
                        <code style={{ fontSize: '0.72rem', color: '#94a3b8' }}>ID: {pl._id?.slice(-6)}</code>
                      </div>
                    </div>
                  </div>
                  {idx === 0 && (
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#6ee7b7',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      LATEST
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
