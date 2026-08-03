import { useEffect } from "react";

// Task 1: useEffect to log 'Component mounted' on first render
const TrendingSongs = () => {
  useEffect(() => {
    console.log("Component mounted");
  }, []); // Empty dependency array → runs only once on mount

  const songs = [
    { id: 1, title: "Kesariya", artist: "Arijit Singh", plays: "1.2B" },
    { id: 2, title: "Tum Ho", artist: "Mohit Chauhan", plays: "980M" },
    { id: 3, title: "Raataan Lambiyan", artist: "Jubin Nautiyal", plays: "870M" },
    { id: 4, title: "Tera Ban Jaunga", artist: "Tulsi Kumar", plays: "760M" },
    { id: 5, title: "Dil Diyan Gallan", artist: "Atif Aslam", plays: "640M" },
  ];

  return (
    <section className="card">
      <div className="card-header">
        <span className="badge badge-purple">🎵 Task 1</span>
        <h2>Trending Songs</h2>
        <p className="subtitle">Check your browser console — "Component mounted" was logged on first render!</p>
      </div>

      <ul className="song-list">
        {songs.map((song, index) => (
          <li key={song.id} className="song-item">
            <span className="rank">#{index + 1}</span>
            <div className="song-info">
              <strong>{song.title}</strong>
              <span className="artist">{song.artist}</span>
            </div>
            <span className="plays">{song.plays}</span>
          </li>
        ))}
      </ul>

      <div className="console-hint">
        <span>💻</span>
        <code>console.log("Component mounted")</code>
        <span>→ runs once on mount</span>
      </div>
    </section>
  );
};

export default TrendingSongs;
