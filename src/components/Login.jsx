import { useState, useEffect } from 'react'
import '../styles/Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // CAPTCHA STATES
  const [captcha, setCaptcha] = useState("");
  const [answer, setAnswer] = useState("");
  const [userInput, setUserInput] = useState("");

  // Generate CAPTCHA once when page loads
  useEffect(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptcha(`${a} + ${b}`);
    setAnswer(a + b);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // CAPTCHA VALIDATION
    if (parseInt(userInput) !== answer) {
      alert("Captcha incorrect!");
      return;
    }

    // LOGIN VALIDATION (unchanged)
    if (username === 'admin' && password === 'admin123') {
      onLogin({ username: 'admin', role: 'admin' })
    } else if (username === 'user' && password === 'user123') {
      onLogin({ username: 'user', role: 'user' })
    } else {
      setError('Invalid username or password')
    }
  };

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

          {/* CAPTCHA SECTION ADDED */}
          <div className="form-group">
            <label>Captcha: Solve {captcha}</label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter answer"
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

export default Login;
