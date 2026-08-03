import React from 'react'

const FollowerList = ({ followers }) => {
  return (
    <div>
      {followers.length === 0 ? (
        <p style={{
          color: 'gray',
          textAlign: 'center',
          padding: '16px',
          border: '1px dashed #ddd',
          borderRadius: '8px'
        }}>
          No followers yet
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {followers.map((username, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#2874f0',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '13px'
              }}>
                {username[0].toUpperCase()}
              </div>
              @{username}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FollowerList