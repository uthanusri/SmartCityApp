import React from "react";
import "../styles/Dashboard.css";

const Home = () => {
  return (
    <div className="home-section">
      <section className="hero-box">
        <h1>Welcome to Smart City Portal</h1>
        <p>
          Your one-stop platform to explore essential city services, report issues,
          access amenities, and stay connected with your city.
        </p>
      </section>

      <section className="info-grid">
        <div className="info-card">
          <h3> Public Services</h3>
          <p>Find hospitals, fire stations, police stations, and other emergency services near you.</p>
        </div>

        <div className="info-card">
          <h3> Infrastructure</h3>
          <p>View details about roads, utilities, transportation networks, and city infrastructure.</p>
        </div>

        <div className="info-card">
          <h3> Amenities</h3>
          <p>Discover parks, libraries, community centers, schools, and recreation spots.</p>
        </div>

        <div className="info-card">
          <h3> Report Issues</h3>
          <p>Raise complaints or alerts regarding public issues that need quick attention.</p>
        </div>
      </section>

      <section className="tip-box">
        <h3> Did You Know?</h3>
        <p>
          Smart cities use technology to improve urban services,
          reduce environmental impact, and enhance the quality of life.
        </p>
      </section>
    </div>
  );
};

export default Home;
