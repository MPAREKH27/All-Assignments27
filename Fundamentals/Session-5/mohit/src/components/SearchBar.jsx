import { useState } from 'react'
import './SearchBar.css'

function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="searchbar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for products, brands and more…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear-btn" onClick={() => setQuery('')}>✕</button>
        )}
      </div>
      <div className="search-preview">
        <p className="preview-label">Live value:</p>
        {query ? (
          <p className="preview-value">"{query}"</p>
        ) : (
          <p className="preview-empty">Start typing to see the value here…</p>
        )}
      </div>
    </div>
  )
}

export default SearchBar