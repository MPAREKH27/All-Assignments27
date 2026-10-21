import React, { useState } from 'react';
import { Code2, ArrowRight, CheckCircle2, Zap, Terminal, Activity, Trash2 } from 'lucide-react';

export default function Task5AsyncComparison({ apiLogs = [], onClearLogs }) {
  const [selectedSnippet, setSelectedSnippet] = useState('createPlaylist');

  const snippets = {
    createPlaylist: {
      title: 'Task 1: Save Playlist',
      legacy: `// BEFORE: Using .then() and .catch()
exports.createPlaylist = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const newPlaylist = new Playlist({ name });
  newPlaylist.save()
    .then(saved => {
      res.status(201).json({
        success: true,
        message: 'Playlist created successfully!',
        playlist: saved
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err.message
      });
    });
};`,
      modern: `// AFTER (Task 5): Refactored with async/await & try/catch
exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name required' });
    }

    const newPlaylist = new Playlist({ name: name.trim() });
    const savedPlaylist = await newPlaylist.save(); // Await Mongoose save

    return res.status(201).json({
      success: true,
      message: \`Playlist "\${savedPlaylist.name}" created successfully!\`,
      playlist: savedPlaylist
    });
  } catch (error) {
    // try/catch handles Mongoose validation & database errors
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};`
    },

    addRestaurant: {
      title: 'Task 2: Save Restaurant',
      legacy: `// BEFORE: Using .then() and .catch()
exports.addRestaurant = (req, res) => {
  const { name, cuisine, rating } = req.body;
  
  Restaurant.create({ name, cuisine, rating })
    .then(saved => {
      res.status(201).json({
        success: true,
        restaurant: saved
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};`,
      modern: `// AFTER (Task 5): Refactored with async/await & try/catch
exports.addRestaurant = async (req, res) => {
  try {
    const { name, cuisine, rating } = req.body;
    
    // Validate inputs
    if (!name || !cuisine || !rating) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const restaurant = new Restaurant({ name, cuisine, rating: Number(rating) });
    const savedRestaurant = await restaurant.save(); // async save

    return res.status(201).json({
      success: true,
      message: \`Restaurant "\${savedRestaurant.name}" saved successfully!\`,
      restaurant: savedRestaurant
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};`
    },

    getMovies: {
      title: 'Task 3: Fetch Movies',
      legacy: `// BEFORE: Using .then() and .catch()
exports.getMovies = (req, res) => {
  Movie.find()
    .sort({ releaseYear: -1 })
    .then(movies => {
      res.status(200).json(movies);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};`,
      modern: `// AFTER (Task 5): Refactored with async/await & try/catch
exports.getMovies = async (req, res) => {
  try {
    // async/await for Mongoose query
    const movies = await Movie.find().sort({ releaseYear: -1 });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: \`Server Error: \${error.message}\`
    });
  }
};`
    },

    connectDB: {
      title: 'MongoDB Connection',
      legacy: `// BEFORE: Using .then() and .catch()
const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(conn => console.log('MongoDB Connected'))
    .catch(err => console.error('Connection error:', err));
};`,
      modern: `// AFTER (Task 5): Refactored with async/await & try/catch
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(\`MongoDB Connected: \${conn.connection.name}\`);
    return conn;
  } catch (error) {
    console.error(\`MongoDB Error: \${error.message}\`);
    return null;
  }
};`
    }
  };

  return (
    <div className="task-container">
      <div className="task-section-header">
        <div>
          <span className="task-pill">Task 5: Refactoring Architecture</span>
          <h2>Async/Await vs .then()/.catch() Refactoring</h2>
          <p className="task-desc">
            All MongoDB operations in the Node backend have been refactored from promise chaining <code>.then()/.catch()</code> 
            to modern <code>async/await</code> with structured <code>try/catch</code> blocks for cleaner readability and robust error handling.
          </p>
        </div>
      </div>

      {/* Snippet Selection Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {Object.entries(snippets).map(([key, data]) => (
          <button
            key={key}
            className={`btn btn-sm ${selectedSnippet === key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedSnippet(key)}
          >
            <Code2 size={14} />
            <span>{data.title}</span>
          </button>
        ))}
      </div>

      {/* Side-by-side Code Diff */}
      <div className="code-diff-container">
        <div className="code-box">
          <div className="code-box-header" style={{ color: '#f87171' }}>
            <span>BEFORE: .then() / .catch() (Legacy)</span>
            <span style={{ fontSize: '0.72rem', background: 'rgba(239, 68, 68, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>
              Callback Nesting
            </span>
          </div>
          <pre>{snippets[selectedSnippet].legacy}</pre>
        </div>

        <div className="code-box" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
          <div className="code-box-header" style={{ color: '#34d399', background: 'rgba(16, 185, 129, 0.1)' }}>
            <span>AFTER: async / await with try / catch (Task 5)</span>
            <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.25)', padding: '2px 6px', borderRadius: '4px' }}>
              Clean & Linear
            </span>
          </div>
          <pre>{snippets[selectedSnippet].modern}</pre>
        </div>
      </div>

      {/* Live Request / Response Telemetry Stream */}
      <div className="glass-panel form-panel" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#6366f1" />
            <h3 style={{ fontSize: '1.05rem' }}>Live API Network Telemetry Stream</h3>
            <span style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.2)', padding: '2px 8px', borderRadius: '10px', color: '#a5b4fc' }}>
              {apiLogs.length} events
            </span>
          </div>

          {apiLogs.length > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={onClearLogs}>
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>

        {apiLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            <Terminal size={30} style={{ opacity: 0.3, marginBottom: '8px' }} />
            <p>Telemetry stream ready. Interacting with any task will log the async request/response trace here.</p>
          </div>
        ) : (
          <div className="log-stream">
            {apiLogs.slice(0, 10).map((log, index) => {
              const isErr = log.status >= 400 || log.method === 'ERROR';
              return (
                <div key={index} className={`log-entry ${isErr ? 'error' : 'success'}`}>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}
                  </span>
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: isErr ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: isErr ? '#fecdd3' : '#a7f3d0'
                  }}>
                    {log.method}
                  </span>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{log.url}</span>
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    background: isErr ? '#f43f5e' : '#10b981',
                    color: '#ffffff',
                    fontWeight: 700
                  }}>
                    {log.status}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem', marginLeft: 'auto' }}>
                    {log.duration}ms
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
