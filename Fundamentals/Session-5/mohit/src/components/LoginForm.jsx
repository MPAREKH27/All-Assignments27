import { useState } from 'react'
import './LoginForm.css'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Username: ${username}\nPassword: ${password}`)
    setSubmitted(username)
    setUsername('')
    setPassword('')
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="field">
          <label className="field-label">Username</label>
          <input
            type="text"
            className="field-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="field-label">Password</label>
          <input
            type="password"
            className="field-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Sign in →</button>
      </form>

      {submitted && (
        <div className="success-banner">
          ✅ Logged in as <strong>{submitted}</strong> — fields cleared!
        </div>
      )}
    </div>
  )
}

export default LoginForm