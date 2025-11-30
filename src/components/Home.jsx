import React from "react";

import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-section">

      {/* HERO SECTION */}
      <section className="hero-box">
        <h1>Welcome to the Smart City Portal</h1>
        <p>
          Your central hub to explore city services, report issues, and discover
          amenities designed to enhance your urban living experience.
        </p>
      </section>

      {/* FEATURE GRID */}
      <section className="info-grid">
        <div className="info-card">
          <h3>Public Services</h3>
          <p>
            Find hospitals, police stations, fire stations, and essential
            emergency services at your fingertips.
          </p>
        </div>

        <div className="info-card">
          <h3>Infrastructure</h3>
          <p>
            Get insights about roads, utilities, transport networks, and key
            infrastructure details.
          </p>
        </div>

        <div className="info-card">
          <h3>Amenities</h3>
          <p>
            Explore parks, libraries, community centers, gyms, and recreation
            hotspots across the city.
          </p>
        </div>

        <div className="info-card">
          <h3>Report Issues</h3>
          <p>
            Quickly submit public complaints or alerts that need government
            attention.
          </p>
        </div>
      </section>

      {/* TIP BOX */}
      <section className="tip-box">
        <h3>🌟 Did You Know?</h3>
        <p>
          Smart cities use digital technologies to improve public services,
          increase efficiency, and enhance residents' quality of life.
        </p>
      </section>
    </div>
  );
};

export default Home;
