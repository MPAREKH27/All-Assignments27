import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    gap: '0',
    backgroundColor: '#2849f0',
    padding: '0 20px',
    alignItems: 'center',
  }

  const linkStyle = {
    padding: '14px 20px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    opacity: 0.85,
  }

  const activeLinkStyle = {
    ...linkStyle,
    opacity: 1,
    borderBottom: '3px solid white',
    backgroundColor: 'rgba(255,255,255,0.15)',
  }

  return (
    <nav style={navStyle}>
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', marginRight: '20px' }}>
        🛒 Flipkart
      </span>

      <NavLink
        to="/"
        end
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Home
      </NavLink>

      <NavLink
        to="/deals"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Deals
      </NavLink>

      <NavLink
        to="/cart"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Cart
      </NavLink>

      <NavLink
        to="/Unknown"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Unknown
      </NavLink>
    </nav>
  )
}

export default Navbar