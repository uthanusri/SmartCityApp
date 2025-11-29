import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogout = () => {
    setCurrentUser(null)
  }

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />
  }

  return (
    <div className="app-container">
      {currentUser.role === 'admin' ? (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <UserDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
