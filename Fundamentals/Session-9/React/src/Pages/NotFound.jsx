import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '80px', margin: 0, color: '#28f07f' }}>404</h1>
      <h2 style={{ fontSize: '24px', color: '#333', marginTop: '10px' }}>Page Not Found</h2>
      <p style={{ color: 'gray', fontSize: '15px', marginBottom: '30px' }}>
        Oops! The page you're looking for doesn't exist on Flipkart.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '12px 28px',
          backgroundColor: '#28f07f',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          cursor: 'pointer'
        }}
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound