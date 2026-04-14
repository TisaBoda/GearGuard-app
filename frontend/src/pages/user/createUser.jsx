// src/pages/Users/CreateUser.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

 const [form, setForm] = useState({
  fullName: '',
  username: '',
  email: '',
  password: '',
  department: '',
  role: 'Technician',   // fixed
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create user');

      navigate('/teams'); // after create, go assign to team
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .cu-root{min-height:100vh;background:#222225;color:#fff;padding:40px;font-family:'Barlow',sans-serif;}
        .cu-wrap{max-width:900px;margin:0 auto;}
        .cu-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;}
        .cu-title{font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:800;letter-spacing:3px;text-transform:uppercase;}
        .cu-title span{color:#f0a500;}
        .cu-back{background:none;border:1px solid #2a2a2a;color:#fff;padding:10px 14px;cursor:pointer;}
        .cu-card{background:#111;border:1px solid #1e1e1e;}
        .cu-card-h{padding:18px 22px;border-bottom:1px solid #1e1e1e;font-family:'Barlow Condensed',sans-serif;
          font-size:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;}
        .cu-card-b{padding:22px;}
        .cu-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .cu-grid-1{grid-column:1/-1;}
        .cu-input,.cu-select{width:100%;padding:14px;background:#1a1a1a;border:1px solid #2a2a2a;color:#fff;outline:none;}
        .cu-input:focus,.cu-select:focus{border-color:#f0a500;}
        .cu-actions{display:flex;gap:12px;margin-top:16px;}
        .cu-btn{border:none;cursor:pointer;padding:14px 18px;font-family:'Barlow Condensed',sans-serif;font-weight:800;
          letter-spacing:2px;text-transform:uppercase;}
        .cu-btn-primary{background:#f0a500;color:#000;}
        .cu-btn-primary:disabled{opacity:.6;cursor:not-allowed;}
        .cu-btn-ghost{background:transparent;border:1px solid #2a2a2a;color:#fff;}
        .cu-error{margin-bottom:12px;color:#ff6b7a;border:1px solid #3a1d22;background:#1a1012;padding:10px;}
        @media(max-width:800px){.cu-grid{grid-template-columns:1fr;}}
      `}</style>

      <div className="cu-root">
        <div className="cu-wrap">
          <div className="cu-top">
            <div className="cu-title">Create <span>Team Member</span></div>
            <button className="cu-back" onClick={() => navigate(-1)}>← Back</button>
          </div>

          <div className="cu-card">
            <div className="cu-card-b">
              {error && <div className="cu-error">{error}</div>}

              <form onSubmit={onSubmit}>
                <div className="cu-grid">
                  <input className="cu-input" name="fullName" placeholder="Full name" value={form.fullName} onChange={onChange} required />
                  <input className="cu-input" name="username" placeholder="Username" value={form.username} onChange={onChange} required />

                  <input className="cu-input" name="email" placeholder="Email" value={form.email} onChange={onChange} required />


                  <input className="cu-input cu-grid-1" name="department" placeholder="Department (optional)" value={form.department} onChange={onChange} />

                  <input
  className="cu-input cu-full"
  name="role"
  placeholder="Role (Technician)"
  value={form.role}
  onChange={onChange}
  required
/>
                </div>

                <div className="cu-actions">
                  <button className="cu-btn cu-btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create User'}
                  </button>
                  <button className="cu-btn cu-btn-ghost" type="button" onClick={() => navigate('/teams')}>
                    Cancel
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}