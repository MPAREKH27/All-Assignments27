import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DealsPage from './pages/DealsPage'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Routes>
          <Route path="/"       element={<HomePage />} />
          <Route path="/deals"  element={<DealsPage />} />
          <Route path="/cart"   element={<CartPage />} />
          <Route path="*"       element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App