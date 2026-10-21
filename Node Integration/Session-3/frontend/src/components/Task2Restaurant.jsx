import React, { useState, useEffect } from 'react';
import { Utensils, Star, PlusCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function Task2Restaurant({ onShowAlert, onLogApi }) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    rating: 5
  });
  const [restaurants, setRestaurants] = useState([]);
  const [lastSavedRestaurant, setLastSavedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Common cuisines for quick selection
  const popularCuisines = ['Italian', 'Japanese', 'Mexican', 'Indian', 'Mediterranean', 'French', 'American', 'Thai'];

  // Fetch all existing restaurants
  const fetchRestaurants = async () => {
    setFetching(true);
    const start = Date.now();
    try {
      const res = await fetch('http://localhost:5000/restaurants');
      const duration = Date.now() - start;
      const data = await res.json();

      onLogApi?.({
        method: 'GET',
        url: '/restaurants',
        status: res.status,
        duration,
        data
      });

      if (res.ok && data.restaurants) {
        setRestaurants(data.restaurants);
      } else {
        onShowAlert({ type: 'error', message: data.error || 'Failed to load restaurants' });
      }
    } catch (err) {
      onShowAlert({ type: 'error', message: `Could not connect to server: ${err.message}` });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (ratingVal) => {
    setFormData(prev => ({ ...prev, rating: ratingVal }));
  };

  // Submit form (Task 2: sends name, cuisine, rating to Node backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side quick check
    if (!formData.name.trim() || !formData.cuisine.trim()) {
      onShowAlert({ type: 'error', message: 'Please provide both restaurant name and cuisine type.' });
      return;
    }

    setLoading(true);
    const start = Date.now();

    try {
      const response = await fetch('http://localhost:5000/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          cuisine: formData.cuisine.trim(),
          rating: Number(formData.rating)
        })
      });

      const duration = Date.now() - start;
      const data = await response.json();

      onLogApi?.({
        method: 'POST',
        url: '/restaurants',
        status: response.status,
        duration,
        data
      });

      if (!response.ok) {
        // Task 4: Error handling - display alert with error
        onShowAlert({
          type: 'error',
          message: data.error || 'Failed to save restaurant to MongoDB.'
        });
        return;
      }

      // Task 2: Backend returns the saved restaurant object to display on frontend
      const savedDoc = data.restaurant;
      setLastSavedRestaurant(savedDoc);
      setRestaurants(prev => [savedDoc, ...prev]);

      onShowAlert({
        type: 'success',
        message: data.message || `Restaurant "${savedDoc.name}" saved successfully!`
      });

      // Reset form
      setFormData({
        name: '',
        cuisine: '',
        rating: 5
      });
    } catch (err) {
      // Task 4: Handle network error
      onShowAlert({
        type: 'error',
        message: `Network Error: ${err.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-container">
      <div className="task-section-header">
        <div>
          <span className="task-pill">Task 2 & Task 4 & Task 5</span>
          <h2>Restaurant Registration Flow</h2>
          <p className="task-desc">
            Builds a React form (name, cuisine, rating) that sends a <code>POST /restaurants</code> request to Node. 
            The backend saves it in MongoDB with Mongoose using <code>async/await</code> and returns the <strong>saved restaurant object</strong> to display directly on the frontend.
          </p>
        </div>
      </div>

      <div className="grid-2col">
        {/* Restaurant Form */}
        <div className="glass-panel form-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PlusCircle size={20} color="#06b6d4" />
            Add New Restaurant
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="rest-name">Restaurant Name</label>
              <input
                id="rest-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="e.g. Bella Trattoria"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rest-cuisine">Cuisine Type</label>
              <input
                id="rest-cuisine"
                name="cuisine"
                type="text"
                className="form-input"
                placeholder="e.g. Italian, Sushi, Bistro"
                value={formData.cuisine}
                onChange={handleChange}
                disabled={loading}
              />
              <div className="pill-group">
                {popularCuisines.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`quick-pill ${formData.cuisine === c ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, cuisine: c }))}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Rating (1 to 5 Stars)</label>
              <div className="rating-picker">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                    title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    ★
                  </button>
                ))}
                <span className="rating-value-pill">{formData.rating}.0 / 5.0</span>
              </div>
            </div>

            <button
              id="submit-restaurant-btn"
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '10px' }}
              disabled={loading}
            >
              {loading ? (
                <>Saving to MongoDB...</>
              ) : (
                <>
                  <Utensils size={18} />
                  Submit Restaurant to Backend
                </>
              )}
            </button>
          </form>

          {/* Last Saved Restaurant Object Showcase */}
          {lastSavedRestaurant && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#67e8f9', fontSize: '0.86rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} />
                <span>Returned Saved Restaurant Object (Task 2 Requirement):</span>
              </div>
              <pre style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#e2e8f0',
                background: '#090d16',
                padding: '12px',
                borderRadius: '6px',
                overflowX: 'auto'
              }}>
                {JSON.stringify(lastSavedRestaurant, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Saved Restaurants Grid */}
        <div className="glass-panel form-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Utensils size={20} color="#10b981" />
              Saved Restaurants ({restaurants.length})
            </h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={fetchRestaurants}
              disabled={fetching}
            >
              Refresh
            </button>
          </div>

          {restaurants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Utensils size={36} style={{ opacity: 0.3, marginBottom: '10px' }} />
              <p>No restaurants found in MongoDB yet.</p>
              <p style={{ fontSize: '0.82rem' }}>Add a restaurant using the form on the left!</p>
            </div>
          ) : (
            <div className="card-list">
              {restaurants.map((item, idx) => (
                <div key={item._id || idx} className={`card-item ${lastSavedRestaurant?._id === item._id ? 'newly-added' : ''}`}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>{item.name}</h4>
                      <span style={{
                        fontSize: '0.74rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(99, 102, 241, 0.2)',
                        color: '#c7d2fe',
                        border: '1px solid rgba(99, 102, 241, 0.3)'
                      }}>
                        {item.cuisine}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#fbbf24', fontWeight: 600 }}>
                        <Star size={13} fill="#fbbf24" />
                        {Number(item.rating).toFixed(1)}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {new Date(item.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>•</span>
                      <code>_id: {item._id?.slice(-6)}</code>
                    </div>
                  </div>

                  {lastSavedRestaurant?._id === item._id && (
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(6, 182, 212, 0.2)',
                      color: '#67e8f9',
                      border: '1px solid rgba(6, 182, 212, 0.4)'
                    }}>
                      JUST SAVED
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
