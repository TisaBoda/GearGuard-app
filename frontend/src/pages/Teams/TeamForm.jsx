import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import teamService from '../../services/teamService';

export default function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    teamName: '',
    specialization: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) fetchTeam();
  }, [id]);

  const fetchTeam = async () => {
    try {
      const response = await teamService.getTeamById(id);
      const { teamName, specialization, description } = response.data;
      setFormData({ teamName, specialization, description: description || '' });
    } catch {
      setError('Failed to load team data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.teamName || !formData.specialization) {
      setError('Team name and specialization are required!');
      return;
    }
    setLoading(true);
    try {
      if (isEditing) {
        await teamService.updateTeam(id, formData);
      } else {
        await teamService.createTeam(formData);
      }
      navigate('/teams');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tf-root {
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .tf-card {
          width: 100%;
          max-width: 560px;
          background: #111;
          border: 1px solid #1e1e1e;
          border-top: 3px solid #f0a500;
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tf-card-header {
          padding: 28px 32px;
          border-bottom: 1px solid #1e1e1e;
        }
        .tf-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 36px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 4px;
        }
        .tf-subtitle {
          font-size: 13px;
          color: #555;
          font-weight: 300;
        }
        .tf-body { padding: 32px; }

        .tf-error {
          background: rgba(220,53,69,0.1);
          border: 1px solid rgba(220,53,69,0.3);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          font-size: 13px;
          padding: 12px 16px;
          margin-bottom: 24px;
        }
        .tf-group { margin-bottom: 24px; }
        .tf-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 8px;
        }
        .tf-required { color: #f0a500; }
        .tf-input, .tf-select, .tf-textarea {
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
        .tf-input:focus, .tf-select:focus, .tf-textarea:focus {
          border-color: #f0a500;
          background: #1f1f1f;
        }
        .tf-input::placeholder, .tf-textarea::placeholder { color: #3a3a3a; }
        .tf-select option { background: #1a1a1a; color: #fff; }
        .tf-textarea { resize: vertical; min-height: 110px; }

        .tf-actions {
          display: flex;
          gap: 12px;
          padding: 20px 32px;
          border-top: 1px solid #1e1e1e;
        }
        .tf-cancel {
          flex: 1;
          background: none;
          border: 1px solid #2a2a2a;
          color: #555;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .tf-cancel:hover { border-color: #555; color: #fff; }
        .tf-submit {
          flex: 2;
          background: #f0a500;
          border: none;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tf-submit:hover { background: #ffd166; }
        .tf-submit:disabled { background: #333; color: #666; cursor: not-allowed; }

        .tf-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid #000;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="tf-root">
        <div className="tf-card">
          <div className="tf-card-header">
            <h1 className="tf-title">
              {isEditing ? 'Edit Team' : 'New Team'}
            </h1>
            <p className="tf-subtitle">
              {isEditing
                ? 'Update the team information below'
                : 'Fill in the details to create a new team'}
            </p>
          </div>

          <div className="tf-body">
            {error && <div className="tf-error">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="tf-group">
                <label className="tf-label">
                  Team Name <span className="tf-required">*</span>
                </label>
                <input
                  className="tf-input"
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="e.g. IT Support Team"
                />
              </div>

              <div className="tf-group">
                <label className="tf-label">
                  Specialization <span className="tf-required">*</span>
                </label>
                <select
                  className="tf-select"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="">-- Select Specialization --</option>
                  <option value="IT">IT</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="HVAC">HVAC</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="tf-group">
                <label className="tf-label">Description</label>
                <textarea
                  className="tf-textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the team's responsibilities..."
                />
              </div>
            </form>
          </div>

          <div className="tf-actions">
            <button className="tf-cancel" onClick={() => navigate('/teams')}>
              Cancel
            </button>
            <button
              className="tf-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <span className="tf-spinner" />}
              {loading ? 'Saving...' : isEditing ? 'Update Team' : 'Create Team'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}