import { useState } from 'react'

function LikeButton() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 24px',
          fontSize: '1rem',
          backgroundColor: '#7c3aed',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        👍 Like
      </button>
      <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>
        {count} {count === 1 ? 'Like' : 'Likes'}
      </span>
    </div>
  )
}

export default LikeButton