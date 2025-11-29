import { useState, useEffect } from 'react'
import '../styles/Dashboard.css'
import { publicServices, infrastructure, amenities } from '../data/cityData'
import { supabase } from "../utils/supabaseClient";

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('services')

  const [services] = useState(publicServices)
  const [infra] = useState(infrastructure)
  const [amen] = useState(amenities)

  const [issues, setIssues] = useState([])
  const [feedback, setFeedback] = useState([])


  useEffect(() => {
    fetchIssues()
    fetchFeedback()
  }, [])

  // Load Reported Issues
  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from('report_issues')
      .select('*')
      .order('id', { ascending: false })

    if (!error) setIssues(data)
  }

  // Load Feedback
  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('id', { ascending: false })

    if (!error) setFeedback(data)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Smart City Admin Portal</h1>
          <div className="user-section">
            <span className="user-name">Admin: {user.username}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>
            Public Services ({services.length})
          </button>
          <button className={activeTab === 'infrastructure' ? 'active' : ''} onClick={() => setActiveTab('infrastructure')}>
            Infrastructure ({infra.length})
          </button>
          <button className={activeTab === 'amenities' ? 'active' : ''} onClick={() => setActiveTab('amenities')}>
            Amenities ({amen.length})
          </button>
          <button className={activeTab === 'issues' ? 'active' : ''} onClick={() => setActiveTab('issues')}>
            Issue Reports ({issues.length})
          </button>
          <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>
            Feedback ({feedback.length})
          </button>
        </nav>

        <div className="dashboard-main">

          {/* Public Services */}
          {activeTab === 'services' && (
            <div className="content-section">
              <div className="section-header"><h2>Public Services</h2></div>
              <div className="card-grid">
                {services.map(service => (
                  <div key={service.id} className="info-card">
                    <div className="card-header">
                      <h3>{service.name}</h3>
                      <span className="badge">{service.category}</span>
                    </div>
                    <div className="card-body">
                      <p>{service.description}</p>
                      <p><strong>Address:</strong> {service.address}</p>
                      <p><strong>Phone:</strong> {service.phone}</p>
                      <p><strong>Hours:</strong> {service.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Infrastructure */}
          {activeTab === 'infrastructure' && (
            <div className="content-section">
              <div className="section-header"><h2>Infrastructure</h2></div>
              <div className="card-grid">
                {infra.map(item => (
                  <div key={item.id} className="info-card">
                    <div className="card-header">
                      <h3>{item.name}</h3>
                      <span className={`badge ${item.status === 'Operational' ? 'badge-success' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p>{item.description}</p>
                      <p><strong>Type:</strong> {item.type}</p>
                      <p><strong>Capacity:</strong> {item.capacity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {activeTab === 'amenities' && (
            <div className="content-section">
              <div className="section-header"><h2>Amenities</h2></div>
              <div className="card-grid">
                {amen.map(a => (
                  <div key={a.id} className="info-card">
                    <div className="card-header">
                      <h3>{a.name}</h3>
                      <span className="badge">{a.type}</span>
                    </div>
                    <div className="card-body">
                      <p>{a.description}</p>
                      <p><strong>Location:</strong> {a.location}</p>
                      <p><strong>Features:</strong> {a.features}</p>
                      <p><strong>Hours:</strong> {a.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔥 Issue Reports from Supabase */}
          {activeTab === 'issues' && (
            <div className="content-section">
              <div className="section-header"><h2>Issue Reports</h2></div>

              {issues.length === 0 ? (
                <p>No issues reported yet</p>
              ) : (
                <div className="list-view">
                  {issues.map(issue => (
                    <div key={issue.id} className="list-item">
                      <h3>{issue.title}</h3>
                      <p>{issue.description}</p>
                      <span className="timestamp">{issue.created_at}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 🔥 Feedback from Supabase */}
          {activeTab === 'feedback' && (
            <div className="content-section">
              <div className="section-header"><h2>User Feedback</h2></div>

              {feedback.length === 0 ? (
                <p>No feedback submitted yet</p>
              ) : (
                <div className="list-view">
                  {feedback.map(item => (
                    <div key={item.id} className="list-item">
                      <h3>{item.amenity}</h3>
                      <p>{item.comment}</p>
                      <p>Rating: {item.rating}/5</p>
                      <span className="timestamp">{item.created_at}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard