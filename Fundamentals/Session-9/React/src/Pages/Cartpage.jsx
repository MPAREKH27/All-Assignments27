import React, { useState } from 'react'

const initialCart = [
  { name: 'iPhone 16 Pro', price: 96999 },
  { name: 'AirPods Pro', price: 24900 },
]

const CartPage = () => {
  const [cart, setCart] = useState(initialCart)

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div style={{ padding: '30px 20px' }}>
      <h1 style={{ fontSize: '26px', color: '#28f0a3', marginBottom: '20px' }}>🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p style={{ color: 'gray', textAlign: 'center', padding: '40px', border: '1px dashed #ddd', borderRadius: '10px' }}>
          Your cart is empty!
        </p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 18px',
              border: '1px solid #eee',
              borderRadius: '10px',
              marginBottom: '10px'
            }}>
              <span style={{ fontSize: '15px', fontWeight: '500' }}>{item.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#28f07b', fontWeight: 'bold' }}>
                  ₹{item.price.toLocaleString()}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    background: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    color: 'red',
                    fontSize: '13px'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px 18px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderTop: '2px solid #eee',
            marginTop: '8px'
          }}>
            <span>Total Amount</span>
            <span style={{ color: '#e0245e' }}>₹{total.toLocaleString()}</span>
          </div>

          <button style={{
            width: '100%',
            padding: '14px',
            marginTop: '16px',
            backgroundColor: '#fb641b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Place Order
          </button>
        </>
      )}
    </div>
  )
}

export default CartPage