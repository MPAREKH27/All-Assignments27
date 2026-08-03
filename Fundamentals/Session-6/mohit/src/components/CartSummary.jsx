import React from 'react'

const CartSummary = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div>
      {cartItems.length === 0 ? (
        <p style={{
          color: 'gray',
          textAlign: 'center',
          padding: '16px',
          border: '1px dashed #ddd',
          borderRadius: '8px'
        }}>
          Cart is empty 🛒
        </p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                border: '1px solid #eee',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                <span>{item.name}</span>
                <span style={{ fontWeight: 'bold', color: '#2874f0' }}>
                  ₹{item.price.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 14px',
            fontWeight: 'bold',
            fontSize: '15px',
            borderTop: '1px solid #eee',
            marginTop: '8px'
          }}>
            <span>Total</span>
            <span style={{ color: '#e0245e' }}>₹{total.toLocaleString()}</span>
          </div>

          {/* Task 4 — button only shows when 3 or more items */}
          {cartItems.length >= 3 && (
            <button
              onClick={() => alert('Proceeding to Checkout!')}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '12px',
                backgroundColor: '#fb641b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Checkout Now
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default CartSummary