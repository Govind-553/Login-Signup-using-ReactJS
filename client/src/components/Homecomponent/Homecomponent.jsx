import React, { useState } from "react";
import { FaUser, FaChartBar, FaCog, FaBars, FaTimes } from "react-icons/fa";
import "./Homecomponent.css";

const HomeComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-page">
      {/* ===== NAVBAR ===== */}
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-logo">Dashboard</div>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <button><FaUser /> Profile</button>
            <button><FaChartBar /> Analytics</button>
            <button><FaCog /> Settings</button>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="content-wrapper">
        <section className="hero-card">
          <h1>Thank you for registering with us 🙌</h1>
          <p>
            You can reuse this <strong>Login & Register authentication flow</strong>
            in your next React project and save development time.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">🚀 Get Started</button>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="secondary-btn">
  📘 View Docs
</a>

          </div>
        </section>

        <section className="feature-grid">
          <div className="feature-card">
            <FaUser />
            <h3>User Auth</h3>
            <p>Secure login & signup flow</p>
          </div>

          <div className="feature-card">
            <FaChartBar />
            <h3>Scalable</h3>
            <p>Ready for real-world apps</p>
          </div>

          <div className="feature-card">
            <FaCog />
            <h3>Customizable</h3>
            <p>Easy to extend & modify</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeComponent;
