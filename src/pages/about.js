// src/pages/About.js
import React from 'react';
import './about.css';

const about = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Orizon+</h1>
        <p>Your local gateway to short-term, part-time opportunities.</p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Orizon+, our mission is to empower individuals by connecting them with nearby work
          opportunities, regardless of their background or education level. We're committed to
          making employment accessible, fast, and community-driven.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li><strong>📍 Location-Based Job Discovery:</strong> Find jobs near you with real-time geolocation.</li>
          <li><strong>⚡ First-Come, First-Served Model:</strong> Get hired quickly and fairly.</li>
          <li><strong>👤 Role-Based Dashboards:</strong> Separate interfaces for job seekers and providers.</li>
          <li><strong>🎯 Smart Filters & Search:</strong> Easily find jobs or candidates by skill, time, and location.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Built with Purpose</h2>
        <p>
          Orizon+ began as a college project focused on solving real-world employment issues in
          local communities. With support for both literate and illiterate users, we strive to keep
          the platform inclusive and impactful.
        </p>
      </section>

      <section className="about-section">
        <h2>Tech Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js (modern component-based design)</li>
          <li><strong>Backend:</strong> Node.js, Express, MongoDB</li>
          <li><strong>Authentication:</strong> Token-based with user data in MongoDB</li>
          <li><strong>UX:</strong> Video backgrounds, animated UI, role-based onboarding</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We believe in a world where anyone can find work nearby — quickly, fairly, and easily.
          By leveraging technology, OrizonPlus supports micro-employment and boosts local economies.
        </p>
      </section>

      <section className="about-cta">
        <h3>Join Orizon+ Today</h3>
        <p>Discover opportunities. Connect with local talent. Grow together.</p>
      </section>
      <div className="blue-circle circle"></div>
      <div className="orange-circle circle"></div>
    </div>
  );
};

export default about;
