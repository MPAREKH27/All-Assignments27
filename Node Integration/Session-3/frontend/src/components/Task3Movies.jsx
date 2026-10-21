import React, { useState, useEffect } from 'react';
import { Film, Star, Calendar, User, RefreshCw, Plus, Sparkles, AlertCircle } from 'lucide-react';

export default function Task3Movies({ onShowAlert, onLogApi }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    releaseYear: 2024,
    rating: 8.5,
    director: '',
    description: '',
    posterUrl: ''
  });

  // Task 3: Fetch GET /movies from backend
  const fetchMovies = async () => {
    setLoading(true);
    const start = Date.now();
    try {
      const response = await fetch('http://localhost:5000/movies');
      const duration = Date.now() - start;
      const data = await response.json();

      onLogApi?.({
        method: 'GET',
        url: '/movies',
        status: response.status,
        duration,
        data
      });

      if (!response.ok) {
        // Task 4: Error handling if GET /movies fails
        onShowAlert({
          type: 'error',
          message: data.error || 'Failed to fetch movies from MongoDB'
        });
        return;
      }

      setMovies(data);
    } catch (err) {
      // Task 4: Connection error
      onShowAlert({
        type: 'error',
        message: `Error connecting to backend: ${err.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Quick Seed Button
  const handleSeed = async (force = false) => {
    setSeeding(true);
    const start = Date.now();
    try {
      const url = `http://localhost:5000/movies/seed${force ? '?force=true' : ''}`;
      const res = await fetch(url, { method: 'POST' });
      const duration = Date.now() - start;
      const data = await res.json();

      onLogApi?.({
        method: 'POST',
        url: '/movies/seed',
        status: res.status,
        duration,
        data
      });

      if (res.ok) {
        onShowAlert({
          type: 'success',
          message: data.message || 'Sample movies loaded into MongoDB!'
        });
        await fetchMovies();
      } else {
        onShowAlert({
          type: 'error',
          message: data.error || 'Failed to seed sample movies'
        });
      }
    } catch (err) {
      onShowAlert({ type: 'error', message: err.message });
    } finally {
      setSeeding(false);
    }
  };

  // Add Movie Form Submit
  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newMovie.title.trim() || !newMovie.genre.trim()) {
      onShowAlert({ type: 'error', message: 'Movie title and genre are required.' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
      });
      const data = await res.json();

      if (res.ok) {
        onShowAlert({ type: 'success', message: data.message });
        setNewMovie({
          title: '',
          genre: '',
          releaseYear: 2024,
          rating: 8.5,
          director: '',
          description: '',
          posterUrl: ''
        });
        setShowAddForm(false);
        fetchMovies();
      } else {
        onShowAlert({ type: 'error', message: data.error });
      }
    } catch (err) {
      onShowAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="task-container">
      <div className="task-section-header">
        <div>
          <span className="task-pill">Task 3 & Task 4 & Task 5</span>
          <h2>Movies Catalog Flow</h2>
          <p className="task-desc">
            Fetches all movie documents from MongoDB via <code>GET /movies</code> using <code>async/await</code> and renders the collection in real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={fetchMovies}
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? 'spinning' : ''} />
            <span>Fetch /movies</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleSeed(true)}
            disabled={seeding}
            title="Seeds 5 curated cinematic movies into MongoDB"
          >
            <Sparkles size={14} color="#fbbf24" />
            <span>{seeding ? 'Seeding...' : 'Seed Sample Movies'}</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={14} />
            <span>{showAddForm ? 'Cancel' : 'Add Movie'}</span>
          </button>
        </div>
      </div>

      {/* Optional Add Movie Form Modal/Dropdown */}
      {showAddForm && (
        <div className="glass-panel form-panel" style={{ marginBottom: '24px', border: '1px solid var(--primary)' }}>
          <h3 style={{ marginBottom: '14px', fontSize: '1.1rem' }}>Add New Movie to MongoDB</h3>
          <form onSubmit={handleAddMovie}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Oppenheimer"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Genre *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Biography / Drama"
                  value={newMovie.genre}
                  onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Release Year *</label>
                <input
                  type="number"
                  className="form-input"
                  value={newMovie.releaseYear}
                  onChange={(e) => setNewMovie({ ...newMovie, releaseYear: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="form-label">Rating (0-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className="form-input"
                  value={newMovie.rating}
                  onChange={(e) => setNewMovie({ ...newMovie, rating: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="form-label">Director</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Christopher Nolan"
                  value={newMovie.director}
                  onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Poster Image URL (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://..."
                  value={newMovie.posterUrl}
                  onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm">Save Movie</button>
            </div>
          </form>
        </div>
      )}

      {/* Movies Grid */}
      {loading && movies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Film size={40} className="spinning" style={{ opacity: 0.5, marginBottom: '12px' }} />
          <p>Fetching movies from MongoDB via GET /movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <AlertCircle size={40} color="#fbbf24" style={{ marginBottom: '12px' }} />
          <h3>No Movies in MongoDB Collection</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '6px', marginBottom: '18px' }}>
            Click below to populate the MongoDB database with sample movies.
          </p>
          <button className="btn btn-primary" onClick={() => handleSeed(true)} disabled={seeding}>
            <Sparkles size={16} />
            Seed Sample Movies Now
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((m) => (
            <div key={m._id} className="movie-card">
              <div className="movie-poster-wrapper">
                <img
                  src={m.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'}
                  alt={m.title}
                  className="movie-poster-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="movie-rating-badge">
                  <Star size={12} fill="#fbbf24" />
                  <span>{m.rating ? Number(m.rating).toFixed(1) : '8.0'}</span>
                </div>
              </div>

              <div className="movie-body">
                <h3 className="movie-title">{m.title}</h3>
                
                <div className="movie-meta-strip">
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#a5b4fc',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    fontSize: '0.74rem'
                  }}>
                    {m.genre}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} />
                    <span>{m.releaseYear}</span>
                  </div>
                </div>

                {m.director && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <User size={13} />
                    <span>Director: <strong>{m.director}</strong></span>
                  </div>
                )}

                {m.description && (
                  <p className="movie-desc">{m.description}</p>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>MongoDB ID:</span>
                  <code>{m._id}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
