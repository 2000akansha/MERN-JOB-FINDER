import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <nav className="nav">
          <h1 className="logo">MySite</h1>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MySite</h1>
          <p>Your one-stop solution for everything amazing.</p>
          <a href="#contact" className="cta-button">Get Started</a>
        </div>
      </section>

      <section className="features" id="features">
        <div className="feature">
          <h2>Feature One</h2>
          <p>Describe the first feature here.</p>
        </div>
        <div className="feature">
          <h2>Feature Two</h2>
          <p>Describe the second feature here.</p>
        </div>
        <div className="feature">
          <h2>Feature Three</h2>
          <p>Describe the third feature here.</p>
        </div>
      </section>

      <footer className="footer" id="contact">
        <p>&copy; 2024 Akansha Bhagat. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
