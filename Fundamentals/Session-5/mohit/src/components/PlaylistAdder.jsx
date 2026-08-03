import { useState } from 'react'
import './PlaylistAdder.css'

function PlaylistAdder() {
  const [song, setSong] = useState('')
  const [artist, setArtist] = useState('')
  const [playlist, setPlaylist] = useState([
    { song: 'Blinding Lights', artist: 'The Weeknd' },
    { song: 'Levitating', artist: 'Dua Lipa' },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!song.trim() || !artist.trim()) return
    setPlaylist([...playlist, { song: song.trim(), artist: artist.trim() }])
    setSong('')
    setArtist('')
  }

  return (
    <div className="playlist-container">
      <form onSubmit={handleSubmit} className="playlist-form">
        <input
          type="text"
          className="playlist-input"
          placeholder="Song name"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          required
        />
        <input
          type="text"
          className="playlist-input"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <button type="submit" className="playlist-add-btn">+ Add</button>
      </form>

      <div className="song-list">
        <p className="song-list-title">🎵 My Playlist ({playlist.length})</p>
        {playlist.map((item, index) => (
          <div className="song-item" key={index}>
            <span className="song-number">{index + 1}</span>
            <div className="song-info">
              <span className="song-name">{item.song}</span>
              <span className="song-artist">{item.artist}</span>
            </div>
            <span className="song-wave">♫</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistAdder