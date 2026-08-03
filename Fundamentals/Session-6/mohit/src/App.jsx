import React from 'react'
import Playlist from './components/Playlist'
import OrderStatus from './components/OrderStatus'
import FollowerList from './components/FollowerList'
import CartSummary from './components/CartSummary'

const songs = [
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'Levitating', artist: 'Dua Lipa' },
  { title: 'Stay', artist: 'Kid LAROI & Justin Bieber' },
]

const followers = ['Dev', 'Rajavi', 'Mohit']
const emptyFollowers = []

const cartItems = [
  { name: 'iPhone 16 Pro', price: 96999 },
  { name: 'AirPods Pro', price: 24900 },
  { name: 'MagSafe Charger', price: 4500 },
]

const App = () => {
  const boxStyle = {
    border: '1px solid #eee',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  }

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '0 20px' }}>

      <h2>Task 1 — Playlist</h2>
      <div style={boxStyle}>
        <Playlist songs={songs} />
      </div>

      <h2>Task 2 — Order Status</h2>
      <div style={boxStyle}>
        <OrderStatus isDelivered={true} />
        <br />
        <OrderStatus isDelivered={false} />
      </div>

      <h2>Task 3 — Follower List (with data)</h2>
      <div style={boxStyle}>
        <FollowerList followers={followers} />
      </div>

      <h2>Task 3 — Follower List (empty)</h2>
      <div style={boxStyle}>
        <FollowerList followers={emptyFollowers} />
      </div>

      <h2>Task 4 — Cart Summary</h2>
      <div style={boxStyle}>
        <CartSummary cartItems={cartItems} />
      </div>

    </div>
  )
}

export default App