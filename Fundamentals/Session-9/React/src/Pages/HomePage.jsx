import React from 'react'

const HomePage = () => {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', color: '#28f09d' }}>🏠 Home Page</h1>
      <p style={{ fontSize: '16px', color: 'gray', marginTop: '10px' }}>
        Welcome to Flipkart! Discover millions of products.
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '30px',
        flexWrap: 'wrap'
      }}>
        {['📱 Mobiles', '💻 Laptops', '👟 Fashion', '🏠 Home',].map((item, i) => (
          <div key={i} style={{
            padding: '20px 28px',
            border: '1px solid #eee',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '500',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage