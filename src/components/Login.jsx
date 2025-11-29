import { useState } from 'react'
import '../styles/Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (username === 'admin' && password === 'admin123') {
      onLogin({ username: 'admin', role: 'admin' })
    } else if (username === 'user' && password === 'user123') {
      onLogin({ username: 'user', role: 'user' })
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Smart City Portal</h1>
          <p>Manage and access city information</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="login-info">
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>User:</strong> user / user123</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
