import authService from '../services/authService';
import { useState } from "react";

const GearIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const EyeIcon = ({ show }) =>
  show ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.email || !form.password) {
    setError("All fields are required.");
    return;
  }
  setLoading(true);
  try {
    await authService.login(form.email, form.password);
    window.location.href = '/dashboard';
  } catch (err) {
    setError(err.message || "Invalid credentials.");
  }
  setLoading(false);
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .gg-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Barlow', sans-serif;
          background: #0d0d0d;
        }

        /* LEFT PANEL */
        .gg-left {
          position: relative;
          background: #111;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          overflow: hidden;
        }
        .gg-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px);
          pointer-events: none;
        }
        .gg-gear-bg {
          position: absolute;
          right: -80px;
          top: 50%;
          transform: translateY(-50%);
          width: 420px;
          height: 420px;
          opacity: 0.04;
          animation: spin 40s linear infinite;
        }
        .gg-gear-bg2 {
          position: absolute;
          left: -60px;
          bottom: 80px;
          width: 220px;
          height: 220px;
          opacity: 0.03;
          animation: spin 25s linear infinite reverse;
        }
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
        @keyframes spin2 { to { transform: rotate(360deg); } }
        .gg-gear-bg2 { animation: spin2 25s linear infinite reverse; }

        .gg-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #f0a500;
          position: relative;
          z-index: 1;
        }
        .gg-logo-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #fff;
        }
        .gg-logo-text span { color: #f0a500; }

        .gg-hero { position: relative; z-index: 1; }
        .gg-tagline {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 56px;
          font-weight: 800;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 20px;
        }
        .gg-tagline span { color: #f0a500; display: block; }
        .gg-sub {
          font-size: 15px;
          color: #666;
          font-weight: 300;
          line-height: 1.7;
          max-width: 320px;
        }

        .gg-stats {
          display: flex;
          gap: 32px;
          position: relative;
          z-index: 1;
        }
        .gg-stat { border-left: 2px solid #f0a500; padding-left: 16px; }
        .gg-stat-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
        }
        .gg-stat-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 1px; }

        /* RIGHT PANEL */
        .gg-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: #0d0d0d;
        }
        .gg-card {
          width: 100%;
          max-width: 420px;
          animation: fadeUp 0.5s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gg-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 38px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 4px;
        }
        .gg-heading-sub {
          font-size: 13px;
          color: #555;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .gg-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 8px;
        }
        .gg-input-wrap {
          position: relative;
          margin-bottom: 24px;
        }
        .gg-input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-bottom: 2px solid #333;
          color: #fff;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          padding: 14px 16px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .gg-input:focus {
          border-color: #f0a500;
          background: #1f1f1f;
        }
        .gg-input::placeholder { color: #3a3a3a; }
        .gg-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #555;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }
        .gg-eye:hover { color: #f0a500; }

        .gg-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .gg-check-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #555;
          cursor: pointer;
        }
        .gg-check {
          width: 16px;
          height: 16px;
          accent-color: #f0a500;
          cursor: pointer;
        }
        .gg-forgot {
          font-size: 13px;
          color: #f0a500;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .gg-forgot:hover { border-color: #f0a500; }

        .gg-error {
          background: rgba(220, 53, 69, 0.1);
          border: 1px solid rgba(220, 53, 69, 0.3);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          font-size: 13px;
          padding: 12px 16px;
          margin-bottom: 24px;
        }

        .gg-btn {
          width: 100%;
          background: #f0a500;
          border: none;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 16px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          position: relative;
          overflow: hidden;
        }
        .gg-btn:hover { background: #ffd166; }
        .gg-btn:active { transform: scale(0.99); }
        .gg-btn:disabled { background: #333; color: #666; cursor: not-allowed; }

        .gg-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #000;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin3 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin3 { to { transform: rotate(360deg); } }

        .gg-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 32px 0;
          color: #333;
          font-size: 12px;
          letter-spacing: 2px;
        }
        .gg-divider::before, .gg-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #222;
        }

        .gg-register-link {
          text-align: center;
          font-size: 13px;
          color: #555;
        }
        .gg-register-link a {
          color: #f0a500;
          text-decoration: none;
          font-weight: 500;
          margin-left: 6px;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .gg-register-link a:hover { border-color: #f0a500; }

        @media (max-width: 768px) {
          .gg-root { grid-template-columns: 1fr; }
          .gg-left { display: none; }
          .gg-right { padding: 32px 24px; }
        }
      `}</style>

      <div className="gg-root">
        {/* LEFT PANEL */}
        <div className="gg-left">
          {/* Big gear backgrounds */}
          <svg className="gg-gear-bg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <svg className="gg-gear-bg2" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>

          <div className="gg-logo">
            <GearIcon />
            <div className="gg-logo-text">Gear<span>Guard</span></div>
          </div>

          <div className="gg-hero">
            <div className="gg-tagline">
              Maintain.<br />
              <span>Track.</span>
              Protect.
            </div>
            <p className="gg-sub">
              A unified platform for equipment maintenance, team coordination, and real-time request management across your organization.
            </p>
          </div>

          <div className="gg-stats">
            <div className="gg-stat">
              <div className="gg-stat-num">4</div>
              <div className="gg-stat-label">User Roles</div>
            </div>
            <div className="gg-stat">
              <div className="gg-stat-num">∞</div>
              <div className="gg-stat-label">Equipment</div>
            </div>
            <div className="gg-stat">
              <div className="gg-stat-num">9</div>
              <div className="gg-stat-label">Modules</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="gg-right">
          <div className="gg-card">
            <h1 className="gg-heading">Sign In</h1>
            <p className="gg-heading-sub">Access your maintenance dashboard</p>

            {error && <div className="gg-error">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="gg-input-wrap">
                <label className="gg-label" htmlFor="email">Email Address</label>
                <input
                  className="gg-input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="gg-input-wrap">
                <label className="gg-label" htmlFor="password">Password</label>
                <input
                  className="gg-input"
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="gg-eye"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label="Toggle password"
                >
                  <EyeIcon show={showPass} />
                </button>
              </div>

              <div className="gg-row">
                <label className="gg-check-label">
                  <input
                    className="gg-check"
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  Remember me
                </label>
                <a href="/forgot-password" className="gg-forgot">Forgot password?</a>
              </div>

              <button className="gg-btn" type="submit" disabled={loading}>
                {loading && <span className="gg-spinner" />}
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>

            <div className="gg-divider">OR</div>

            <div className="gg-register-link">
              Don't have an account?
              <a href="/register">Create one here</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}