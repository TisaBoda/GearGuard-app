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

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ROLES = ["Admin", "Manager", "Technician", "Viewer"];
const DEPARTMENTS = ["IT", "Engineering", "Facilities", "Operations", "HR", "Finance", "Other"];

function PasswordStrength({ password }) {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#dc3545", "#f0a500", "#3b9ddd", "#28a745"];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8, marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              background: i <= score ? colors[score] : "#2a2a2a",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {Object.entries({ "8+ chars": checks.length, Uppercase: checks.upper, Lowercase: checks.lower, Number: checks.number }).map(([label, ok]) => (
          <span key={label} style={{ fontSize: 11, color: ok ? "#28a745" : "#444", display: "flex", alignItems: "center", gap: 4 }}>
            {ok ? <CheckIcon /> : "○"} {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({
    fullName: "", username: "", email: "",
    password: "", confirmPassword: "",
    role: "", department: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1 = personal, 2 = credentials

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.username.trim()) e.username = "Username is required";
    else if (form.username.length < 3) e.username = "Min 3 characters";
    if (!form.role) e.role = "Please select a role";
    if (!form.department) e.department = "Please select a department";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep2()) return;
  setLoading(true);
  try {
    await authService.register({
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
      department: form.department,
    });
    setLoading(false);
    setSuccess(true);
  } catch (err) {
    setErrors({ confirmPassword: err.message || 'Registration failed' });
    setLoading(false);
  }
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
        @keyframes spin { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }

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

        .gg-steps {
          position: relative;
          z-index: 1;
        }
        .gg-steps-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 40px;
          line-height: 1;
        }
        .gg-steps-title span { color: #f0a500; display: block; }

        .gg-step-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
        }
        .gg-step-num {
          width: 32px;
          height: 32px;
          border: 2px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #555;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .gg-step-num.active { border-color: #f0a500; color: #f0a500; background: rgba(240,165,0,0.1); }
        .gg-step-num.done { border-color: #28a745; color: #28a745; background: rgba(40,167,69,0.1); }
        .gg-step-info { padding-top: 4px; }
        .gg-step-name {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 2px;
        }
        .gg-step-desc { font-size: 12px; color: #555; font-weight: 300; }

        .gg-left-bottom { position: relative; z-index: 1; }
        .gg-role-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .gg-badge {
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 12px;
          border: 1px solid #2a2a2a;
          color: #555;
          font-weight: 500;
        }
        .gg-badge.highlight { border-color: #f0a500; color: #f0a500; }

        .gg-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: #0d0d0d;
          overflow-y: auto;
        }
        .gg-card {
          width: 100%;
          max-width: 440px;
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
          margin-bottom: 32px;
          font-weight: 300;
        }

        .gg-progress {
          display: flex;
          gap: 6px;
          margin-bottom: 32px;
        }
        .gg-progress-bar {
          flex: 1;
          height: 3px;
          background: #222;
          transition: background 0.4s;
        }
        .gg-progress-bar.filled { background: #f0a500; }

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
          margin-bottom: 20px;
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
          appearance: none;
        }
        .gg-input:focus {
          border-color: #f0a500;
          background: #1f1f1f;
        }
        .gg-input.error { border-color: #dc3545; }
        .gg-input::placeholder { color: #3a3a3a; }
        .gg-field-error {
          font-size: 12px;
          color: #ff6b7a;
          margin-top: 4px;
          display: block;
        }
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

        .gg-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .gg-btn-row {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .gg-btn {
          flex: 1;
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
        }
        .gg-btn:hover { background: #ffd166; }
        .gg-btn:active { transform: scale(0.99); }
        .gg-btn:disabled { background: #333; color: #666; cursor: not-allowed; }
        .gg-btn-outline {
          flex: 0 0 auto;
          background: transparent;
          border: 1px solid #333;
          color: #888;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 24px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .gg-btn-outline:hover { border-color: #888; color: #ccc; }

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

        .gg-success {
          text-align: center;
          padding: 40px 20px;
          animation: fadeUp 0.5s ease both;
        }
        .gg-success-icon {
          width: 72px;
          height: 72px;
          border: 2px solid #28a745;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .gg-success-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 8px;
        }
        .gg-success-sub { font-size: 14px; color: #555; margin-bottom: 32px; }
        .gg-success-btn {
          display: inline-block;
          background: #f0a500;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 14px 40px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .gg-success-btn:hover { background: #ffd166; }

        .gg-login-link {
          text-align: center;
          font-size: 13px;
          color: #555;
          margin-top: 24px;
        }
        .gg-login-link a {
          color: #f0a500;
          text-decoration: none;
          font-weight: 500;
          margin-left: 6px;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .gg-login-link a:hover { border-color: #f0a500; }

        @media (max-width: 768px) {
          .gg-root { grid-template-columns: 1fr; }
          .gg-left { display: none; }
          .gg-right { padding: 32px 24px; align-items: flex-start; }
          .gg-grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="gg-root">
        {/* LEFT PANEL */}
        <div className="gg-left">
          <svg className="gg-gear-bg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>

          <div className="gg-logo">
            <GearIcon />
            <div className="gg-logo-text">Gear<span>Guard</span></div>
          </div>

          <div className="gg-steps">
            <div className="gg-steps-title">
              Join the<br />
              <span>Platform.</span>
            </div>
            {[
              { n: 1, name: "Personal Info", desc: "Your name, role & department" },
              { n: 2, name: "Credentials", desc: "Email & secure password" },
              { n: 3, name: "Access Granted", desc: "Start managing equipment" },
            ].map(({ n, name, desc }) => (
              <div className="gg-step-item" key={n}>
                <div className={`gg-step-num ${step === n ? "active" : step > n || success ? "done" : ""}`}>
                  {(step > n || success) ? <CheckIcon /> : n}
                </div>
                <div className="gg-step-info">
                  <div className="gg-step-name">{name}</div>
                  <div className="gg-step-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="gg-left-bottom">
            <div style={{ fontSize: 11, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Available Roles</div>
            <div className="gg-role-badges">
              {ROLES.map((r) => (
                <div key={r} className={`gg-badge ${form.role === r ? "highlight" : ""}`}>{r}</div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="gg-right">
          <div className="gg-card">
            {success ? (
              <div className="gg-success">
                <div className="gg-success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="gg-success-title">You're In!</div>
                <p className="gg-success-sub">Account created for <strong style={{ color: "#fff" }}>{form.fullName}</strong>.<br />Please wait for admin approval.</p>
                <button className="gg-success-btn" onClick={() => window.location.href = "/login"}>
                  Go to Login
                </button>
              </div>
            ) : (
              <>
                <h1 className="gg-heading">{step === 1 ? "Create Account" : "Set Credentials"}</h1>
                <p className="gg-heading-sub">
                  {step === 1 ? "Tell us about yourself" : "Secure your account"}
                </p>

                <div className="gg-progress">
                  <div className={`gg-progress-bar ${step >= 1 ? "filled" : ""}`} />
                  <div className={`gg-progress-bar ${step >= 2 ? "filled" : ""}`} />
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {step === 1 && (
                    <>
                      <div className="gg-input-wrap">
                        <label className="gg-label">Full Name</label>
                        <input
                          className={`gg-input ${errors.fullName ? "error" : ""}`}
                          name="fullName"
                          type="text"
                          placeholder="John Smith"
                          value={form.fullName}
                          onChange={handleChange}
                        />
                        {errors.fullName && <span className="gg-field-error">{errors.fullName}</span>}
                      </div>

                      <div className="gg-input-wrap">
                        <label className="gg-label">Username</label>
                        <input
                          className={`gg-input ${errors.username ? "error" : ""}`}
                          name="username"
                          type="text"
                          placeholder="johnsmith"
                          value={form.username}
                          onChange={handleChange}
                        />
                        {errors.username && <span className="gg-field-error">{errors.username}</span>}
                      </div>

                      <div className="gg-grid-2">
                        <div className="gg-input-wrap">
                          <label className="gg-label">Role</label>
                          <select
                            className={`gg-input ${errors.role ? "error" : ""}`}
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                          >
                            <option value="">Select role</option>
                            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                          </select>
                          {errors.role && <span className="gg-field-error">{errors.role}</span>}
                        </div>
                        <div className="gg-input-wrap">
                          <label className="gg-label">Department</label>
                          <select
                            className={`gg-input ${errors.department ? "error" : ""}`}
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                          >
                            <option value="">Select dept.</option>
                            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                          {errors.department && <span className="gg-field-error">{errors.department}</span>}
                        </div>
                      </div>

                      <div className="gg-btn-row">
                        <button type="button" className="gg-btn" onClick={handleNext}>
                          Next Step →
                        </button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="gg-input-wrap">
                        <label className="gg-label">Email Address</label>
                        <input
                          className={`gg-input ${errors.email ? "error" : ""}`}
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange}
                        />
                        {errors.email && <span className="gg-field-error">{errors.email}</span>}
                      </div>

                      <div className="gg-input-wrap">
                        <label className="gg-label">Password</label>
                        <input
                          className={`gg-input ${errors.password ? "error" : ""}`}
                          name="password"
                          type={showPass ? "text" : "password"}
                          placeholder="Min 8 characters"
                          value={form.password}
                          onChange={handleChange}
                        />
                        <button type="button" className="gg-eye" onClick={() => setShowPass((v) => !v)}>
                          <EyeIcon show={showPass} />
                        </button>
                        {errors.password && <span className="gg-field-error">{errors.password}</span>}
                      </div>

                      <PasswordStrength password={form.password} />

                      <div className="gg-input-wrap">
                        <label className="gg-label">Confirm Password</label>
                        <input
                          className={`gg-input ${errors.confirmPassword ? "error" : ""}`}
                          name="confirmPassword"
                          type={showConfirm ? "text" : "password"}
                          placeholder="Repeat password"
                          value={form.confirmPassword}
                          onChange={handleChange}
                        />
                        <button type="button" className="gg-eye" onClick={() => setShowConfirm((v) => !v)}>
                          <EyeIcon show={showConfirm} />
                        </button>
                        {errors.confirmPassword && <span className="gg-field-error">{errors.confirmPassword}</span>}
                      </div>

                      <div className="gg-btn-row">
                        <button type="button" className="gg-btn-outline" onClick={() => setStep(1)}>
                          ← Back
                        </button>
                        <button type="submit" className="gg-btn" disabled={loading}>
                          {loading && <span className="gg-spinner" />}
                          {loading ? "Creating..." : "Create Account"}
                        </button>
                      </div>
                    </>
                  )}
                </form>

                <div className="gg-login-link">
                  Already have an account?
                  <a href="/login">Sign in</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}