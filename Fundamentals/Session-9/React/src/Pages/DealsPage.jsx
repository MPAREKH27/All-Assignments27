import React from 'react'

const deals = [
  { name: 'iPhone 16 Pro', price: 96999, discount: '10% off', emoji: '📱' },
  { name: 'Samsung TV 55"', price: 45999, discount: '25% off', emoji: '📺' },
  { name: 'Nike Shoes', price: 3999, discount: '40% off', emoji: '👟' },
  { name: 'MacBook Air M3', price: 114900, discount: '8% off', emoji: '💻' },
]

const DealsPage = () => {
  return (
    <div style={{ padding: '30px 20px' }}>
      <h1 style={{ fontSize: '26px', color: '#28f071', marginBottom: '6px' }}>🔥 Today's Deals</h1>
      <p style={{ color: 'gray', marginBottom: '24px' }}>Limited time offers — grab them fast!</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {deals.map((deal, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            border: '1px solid #eee',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '28px' }}>{deal.emoji}</span>
              <div>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '15px' }}>{deal.name}</p>
                <p style={{ margin: 0, color: 'green', fontSize: '13px' }}>{deal.discount}</p>
              </div>
            </div>
            <p style={{ fontWeight: 'bold', color: '#28f08f', fontSize: '16px', margin: 0 }}>
              ₹{deal.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DealsPage