import React from 'react'

const Playlist = ({ songs }) => {
  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {songs.map((song, index) => (
          <li key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #eee',
            marginBottom: '8px'
          }}>
            <span style={{ color: '#999', fontSize: '13px', minWidth: '18px' }}>
              {index + 1}
            </span>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{song.title}</p>
              <p style={{ margin: 0, color: 'gray', fontSize: '13px' }}>{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist