import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .landing {
          min-height: 100vh;
          background: #0a0a0a;
          color: #fff;
          font-family: 'Work Sans', sans-serif;
          overflow-x: hidden;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(240, 165, 0, 0.1);
          animation: slideDown 0.6s ease;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.2rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #f0a500 0%, #ff8c00 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          font-weight: bold;
          color: #000;
          box-shadow: 0 4px 20px rgba(240, 165, 0, 0.3);
        }

        .logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
        }

        .logo-text .accent { color: #f0a500; }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #f0a500;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #f0a500;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .btn-login {
          background: linear-gradient(135deg, #f0a500 0%, #ff8c00 100%);
          color: #000;
          border: none;
          padding: 0.8rem 2rem;
          font-family: 'Work Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 1px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(240, 165, 0, 0.3);
        }

        .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(240, 165, 0, 0.5);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 8rem 2rem 4rem;
          background: 
            radial-gradient(circle at 20% 50%, rgba(240, 165, 0, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(240, 165, 0, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(240, 165, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240, 165, 0, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          animation: fadeInUp 1s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 88px;
          line-height: 0.95;
          letter-spacing: 3px;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #f0a500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #f0a500 0%, #ff8c00 100%);
          color: #000;
          border: none;
          padding: 1rem 2.5rem;
          font-family: 'Work Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 1px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(240, 165, 0, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(240, 165, 0, 0.6);
        }

        .btn-secondary {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 2.5rem;
          font-family: 'Work Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 1px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          border-color: #f0a500;
          color: #f0a500;
          background: rgba(240, 165, 0, 0.1);
        }

        .hero-visual {
          position: relative;
          animation: fadeInRight 1s ease 0.3s both;
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .hero-image-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(240, 165, 0, 0.2);
        }

        .hero-image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(240, 165, 0, 0.2) 0%, transparent 100%);
          z-index: 1;
        }

        .hero-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
          display: block;
        }

        .floating-card {
          position: absolute;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(240, 165, 0, 0.3);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .floating-card-1 {
          top: 20%;
          right: -10%;
          animation-delay: 0s;
        }

        .floating-card-2 {
          bottom: 15%;
          left: -10%;
          animation-delay: 1.5s;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #f0a500 0%, #ff8c00 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.8rem;
          font-size: 20px;
        }

        .card-title {
          font-weight: 700;
          margin-bottom: 0.3rem;
          font-size: 15px;
        }

        .card-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #f0a500;
        }

        /* Features Section */
        .features {
          padding: 8rem 2rem;
          background: #0f0f0f;
          position: relative;
        }

        .features::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #f0a500, transparent);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-label {
          color: #f0a500;
          font-weight: 700;
          letter-spacing: 3px;
          font-size: 14px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 64px;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 20px;
          max-width: 700px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(20, 20, 20, 0.8) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #f0a500, #ff8c00);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(240, 165, 0, 0.3);
          box-shadow: 0 20px 50px rgba(240, 165, 0, 0.2);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, rgba(240, 165, 0, 0.2) 0%, rgba(240, 165, 0, 0.05) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(240, 165, 0, 0.2);
        }

        .feature-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        .feature-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          font-size: 15px;
        }

        /* Stats Section */
        .stats {
          padding: 6rem 2rem;
          background: 
            linear-gradient(135deg, rgba(240, 165, 0, 0.05) 0%, transparent 100%),
            #0a0a0a;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          text-align: center;
        }

        .stat-item {
          animation: fadeIn 1s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .stat-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          color: #f0a500;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 18px;
          font-weight: 600;
        }

        /* Gallery Section */
        .gallery {
          padding: 8rem 2rem;
          background: #0f0f0f;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .gallery-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .gallery-item:hover {
          transform: scale(1.05);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: #fff;
        }

        /* Contact Section */
        .contact {
          padding: 8rem 2rem;
          background: 
            radial-gradient(circle at 50% 50%, rgba(240, 165, 0, 0.08) 0%, transparent 70%),
            #0a0a0a;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 3rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-card {
          background: linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(20, 20, 20, 0.8) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          border-color: rgba(240, 165, 0, 0.3);
          transform: translateX(8px);
        }

        .contact-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(240, 165, 0, 0.2) 0%, rgba(240, 165, 0, 0.05) 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          border: 1px solid rgba(240, 165, 0, 0.2);
          flex-shrink: 0;
        }

        .contact-details h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .contact-details p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          line-height: 1.6;
        }

        .contact-details a {
          color: #f0a500;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-details a:hover {
          color: #ff8c00;
        }

        .contact-form {
          background: linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(20, 20, 20, 0.8) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 3rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-family: 'Work Sans', sans-serif;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #f0a500;
          background: rgba(0, 0, 0, 0.5);
        }

        .form-textarea {
          resize: vertical;
          min-height: 150px;
        }

        .form-button {
          width: 100%;
          background: linear-gradient(135deg, #f0a500 0%, #ff8c00 100%);
          color: #000;
          border: none;
          padding: 1.2rem;
          font-family: 'Work Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 1px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .form-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(240, 165, 0, 0.5);
        }

        /* Footer */
        .footer {
          background: #0a0a0a;
          border-top: 1px solid rgba(240, 165, 0, 0.1);
          padding: 3rem 2rem 2rem;
          text-align: center;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }

        .footer-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          margin-top: 2rem;
        }

        /* Responsive */
        @media (max-width: 968px) {
          .nav-links {
            display: none;
          }

          .hero-container,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 56px;
          }

          .section-title {
            font-size: 48px;
          }

          .hero-image {
            height: 350px;
          }

          .floating-card {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .features-grid,
          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-subtitle {
            font-size: 18px;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-icon">G</div>
            <div className="logo-text">
              GEAR<span className="accent">GUARD</span>
            </div>
          </div>
          <div className="nav-links">
            <a className="nav-link" onClick={() => scrollTo("features")}>Features</a>
            <a className="nav-link" onClick={() => scrollTo("gallery")}>Gallery</a>
            <a className="nav-link" onClick={() => scrollTo("contact")}>Contact</a>
            <button className="btn-login" onClick={() => navigate("/login")}>
              LOGIN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              POWERFUL<br />
              MAINTENANCE<br />
              MANAGEMENT
            </h1>
            <p className="hero-subtitle">
              Track equipment, manage teams, and streamline maintenance requests
              with our comprehensive platform. From breakdown to repair, we've got you covered.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => navigate("/login")}>
                Get Started
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("features")}>
                Learn More
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" 
                alt="Maintenance Team"
                className="hero-image"
              />
            </div>
            
            <div className="floating-card floating-card-1">
              <div className="card-icon">⚙️</div>
              <div className="card-title">Active Requests</div>
              <div className="card-value">247</div>
            </div>
            
            <div className="floating-card floating-card-2">
              <div className="card-icon">✅</div>
              <div className="card-title">Completed Today</div>
              <div className="card-value">32</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Equipment Tracked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Uptime Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Active Teams</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <div className="section-label">FEATURES</div>
            <h2 className="section-title">EVERYTHING YOU NEED</h2>
            <p className="section-subtitle">
              Powerful tools to manage your maintenance operations efficiently
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3 className="feature-title">Equipment Tracking</h3>
              <p className="feature-description">
                Comprehensive database for all your assets. Track ownership, warranty, location, 
                and maintenance history with detailed records.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Team Management</h3>
              <p className="feature-description">
                Organize specialized teams, assign technicians, and track team performance 
                with detailed analytics and metrics.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">Kanban Workflow</h3>
              <p className="feature-description">
                Visual drag-and-drop board to manage requests from NEW to REPAIRED. 
                Track progress in real-time with status indicators.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Smart Scheduling</h3>
              <p className="feature-description">
                Calendar view for preventive maintenance planning. Schedule routine checkups 
                and never miss critical maintenance windows.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics & Reports</h3>
              <p className="feature-description">
                Detailed insights into team performance, equipment utilization, 
                and maintenance trends with customizable reports.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3 className="feature-title">Smart Notifications</h3>
              <p className="feature-description">
                Real-time alerts for overdue requests, upcoming maintenance, 
                and team assignments. Never miss a critical update.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <div className="section-label">GALLERY</div>
            <h2 className="section-title">SEE IT IN ACTION</h2>
          </div>
          
          <div className="gallery-grid">
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80" 
                alt="Kanban Board"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-title">Kanban Board</div>
              </div>
            </div>
            
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" 
                alt="Analytics Dashboard"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-title">Analytics Dashboard</div>
              </div>
            </div>
            
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" 
                alt="Team Management"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-title">Team Management</div>
              </div>
            </div>
            
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" 
                alt="Equipment Tracking"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-title">Equipment Tracking</div>
              </div>
            </div>
            
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" 
                alt="Calendar View"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-title">Calendar Scheduling</div>
              </div>
            </div>
            
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" 
                alt="Reports"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-title">Detailed Reports</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <div className="section-label">CONTACT US</div>
            <h2 className="section-title">GET IN TOUCH</h2>
            <p className="section-subtitle">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>
                    <a href="mailto:support@gearguard.edu">support@gearguard.edu</a><br />
                    <a href="mailto:sales@gearguard.edu">sales@gearguard.edu</a>
                  </p>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Call Us</h3>
                  <p>
                    +91-9876543210<br />
                    +91-9876543211 (Support)
                  </p>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Visit Us</h3>
                  <p>
                    123 University Road<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">⏰</div>
                <div className="contact-details">
                  <h3>Working Hours</h3>
                  <p>
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Your Message</label>
                  <textarea 
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                
                <button type="submit" className="form-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            GEAR<span style={{color: '#f0a500'}}>GUARD</span>
          </div>
          <p className="footer-text">
            © 2024 GearGuard. All rights reserved. Built with ❤️ for maintenance excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}