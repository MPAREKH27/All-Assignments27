import React, { useState, useEffect } from "react";

// Custom Hook
function useFetchData(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { loading, data, error };
}

// Component using the hook
function SpotifyPlaylists() {
  const { loading, data, error } = useFetchData(
    "https://api.spotify.com/v1/me/playlists"
  );

  if (loading) return <p>Loading playlists...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Spotify Playlists</h2>
      <ul>
        {data.items.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpotifyPlaylists;
