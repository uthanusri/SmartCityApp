import { useState, useEffect } from 'react'
import '../styles/Dashboard.css'
import { supabase } from "../utils/supabaseClient";

import { publicServices, infrastructure, amenities } from '../data/cityData'

const UserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')

  // Report Issue States
  const [issueTitle, setIssueTitle] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [issues, setIssues] = useState([])

  // Feedback States
  const [feedbackAmenity, setFeedbackAmenity] = useState('')
  const [feedbackRating, setFeedbackRating] = useState(5)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedback, setFeedback] = useState([])

  // Load previous issues + feedback from Supabase on UI load
  useEffect(() => {
    fetchIssues()
    fetchFeedback()
  }, [])

  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from("report_issues")
      .select("*")
      .order("id", { ascending: false })

    if (!error) setIssues(data)
  }

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("id", { ascending: false })

    if (!error) setFeedback(data)
  }

  // Insert Issue into Supabase
  const handleReportIssue = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from("report_issues")
      .insert([
        {
          title: issueTitle,
          description: issueDescription,
          status: "pending",
        }
      ])

    if (error) {
      console.log("Supabase Error (handleReportIssue):", error);
      alert("Failed to submit issue.")
    } else {
      alert("Issue submitted successfully!")
      setIssueTitle('')
      setIssueDescription('')
      fetchIssues()
    }
  }

  // Insert Feedback into Supabase
  const handleSubmitFeedback = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          amenity: feedbackAmenity,
          rating: feedbackRating,
          comment: feedbackComment,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.log("Supabase Error (handleSubmitFeedback):", error);
      alert("Failed to submit feedback.")
    } else {
      alert("Feedback submitted successfully!")
      setFeedbackAmenity('')
      setFeedbackRating(5)
      setFeedbackComment('')
      fetchFeedback()
    }
  }

  const filteredServices = publicServices.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredInfra = infrastructure.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAmenities = amenities.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Smart City Portal</h1>
          <div className="user-section">
            <span className="user-name">User: {user.username}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
            Home
          </button>
          <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>
            Public Services
          </button>
          <button className={activeTab === 'infrastructure' ? 'active' : ''} onClick={() => setActiveTab('infrastructure')}>
            Infrastructure
          </button>
          <button className={activeTab === 'amenities' ? 'active' : ''} onClick={() => setActiveTab('amenities')}>
            Amenities
          </button>
          <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>
            Report Issue
          </button>
          <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>
            Give Feedback
          </button>
        </nav>

        <div className="dashboard-main">

          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div className="content-section">
              <h2>Welcome to the Smart City Portal</h2>
              <p className="home-description">
                Explore services, infrastructure, report issues, and share feedback with your city.
              </p>

              <div className="home-grid">
                <div className="home-card"><h3>Public Services</h3><p>Hospitals, Police, Fire Stations, Libraries.</p></div>
                <div className="home-card"><h3>Infrastructure</h3><p>Roads, Bridges, Utilities, Transport.</p></div>
                <div className="home-card"><h3>Amenities</h3><p>Parks, Gyms, Community Centers.</p></div>
                <div className="home-card"><h3>Report Issues</h3><p>Quickly report civic problems.</p></div>
                <div className="home-card"><h3>Give Feedback</h3><p>Share your experience.</p></div>
              </div>
            </div>
          )}

          {/* PUBLIC SERVICES */}
          {activeTab === 'services' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Public Services</h2>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="card-grid">
                {filteredServices.map(service => (
                  <div key={service.id} className="info-card">
                    <div className="card-header">
                      <h3>{service.name}</h3>
                      <span className="badge">{service.category}</span>
                    </div>
                    <div className="card-body">
                      <p className="description">{service.description}</p>
                      <div className="info-row">
                        <strong>Address:</strong> {service.address}
                      </div>
                      <div className="info-row">
                        <strong>Phone:</strong> {service.phone}
                      </div>
                      <div className="info-row">
                        <strong>Hours:</strong> {service.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INFRASTRUCTURE */}
          {activeTab === 'infrastructure' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Infrastructure</h2>
                <input
                  type="text"
                  placeholder="Search infrastructure..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="card-grid">
                {filteredInfra.map(item => (
                  <div key={item.id} className="info-card">
                    <div className="card-header">
                      <h3>{item.name}</h3>
                      <span className={`badge ${item.status === 'Operational' ? 'badge-success' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p className="description">{item.description}</p>
                      <div className="info-row">
                        <strong>Type:</strong> {item.type}
                      </div>
                      <div className="info-row">
                        <strong>Capacity:</strong> {item.capacity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Amenities</h2>
                <input
                  type="text"
                  placeholder="Search amenities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="card-grid">
                {filteredAmenities.map(amenity => (
                  <div key={amenity.id} className="info-card">
                    <div className="card-header">
                      <h3>{amenity.name}</h3>
                      <span className="badge">{amenity.type}</span>
                    </div>
                    <div className="card-body">
                      <p className="description">{amenity.description}</p>
                      <div className="info-row">
                        <strong>Location:</strong> {amenity.location}
                      </div>
                      <div className="info-row">
                        <strong>Features:</strong> {amenity.features}
                      </div>
                      <div className="info-row">
                        <strong>Hours:</strong> {amenity.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORT ISSUE */}
          {activeTab === 'report' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Report an Issue</h2>
              </div>

              <div className="form-container">
                <form onSubmit={handleReportIssue} className="report-form">
                  <div className="form-group">
                    <label>Issue Title</label>
                    <input
                      type="text"
                      value={issueTitle}
                      onChange={(e) => setIssueTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-button">Submit Report</button>
                </form>
              </div>
            </div>
          )}

          {/* FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Provide Feedback</h2>
              </div>

              <div className="form-container">
                <form onSubmit={handleSubmitFeedback} className="report-form">

                  <div className="form-group">
                    <label>Amenity/Service</label>
                    <input
                      type="text"
                      value={feedbackAmenity}
                      onChange={(e) => setFeedbackAmenity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Rating</label>
                    <select
                      value={feedbackRating}
                      onChange={(e) => setFeedbackRating(Number(e.target.value))}
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Very Poor</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Comments</label>
                    <textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-button">Submit Feedback</button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserDashboard