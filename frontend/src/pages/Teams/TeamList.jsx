import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import teamService from '../../services/teamService';

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchTeams(); }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamService.getAllTeams();
      setTeams(response.data);
    } catch (err) {
      setError('Failed to load teams');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await teamService.deleteTeam(id);
        setTeams(teams.filter((t) => t._id !== id));
      } catch {
        setError('Failed to delete team');
      }
    }
  };

  const specializationColor = (s) => ({
    IT: '#3b82f6', Electrical: '#f0a500',
    Mechanical: '#6b7280', HVAC: '#10b981', General: '#8b5cf6'
  }[s] || '#555');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tl-root {
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
          padding: 40px;
        }
        .tl-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          border-bottom: 1px solid #1e1e1e;
          padding-bottom: 24px;
        }
        .tl-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
        }
        .tl-title span { color: #f0a500; }
        .tl-btn {
          background: #f0a500;
          border: none;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 28px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tl-btn:hover { background: #ffd166; }

        .tl-error {
          background: rgba(220,53,69,0.1);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          padding: 12px 16px;
          margin-bottom: 24px;
          font-size: 13px;
        }

        .tl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .tl-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-top: 3px solid var(--accent);
          transition: border-color 0.2s, transform 0.2s;
        }
        .tl-card:hover {
          border-color: #f0a500;
          transform: translateY(-2px);
        }
        .tl-card-header {
          padding: 20px;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .tl-card-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #fff;
          text-transform: uppercase;
        }
        .tl-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          background: rgba(240,165,0,0.1);
          color: #f0a500;
          border: 1px solid rgba(240,165,0,0.3);
        }
        .tl-card-body { padding: 16px 20px; }
        .tl-desc {
          font-size: 13px;
          color: #555;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .tl-members {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #888;
          margin-bottom: 12px;
        }
        .tl-member-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tl-member-tag {
          font-size: 11px;
          color: #888;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          padding: 3px 10px;
        }
        .tl-card-actions {
          display: flex;
          border-top: 1px solid #1e1e1e;
        }
        .tl-action-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 12px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          border-right: 1px solid #1e1e1e;
        }
        .tl-action-btn:last-child { border-right: none; }
        .tl-action-view { color: #10b981; }
        .tl-action-view:hover { background: rgba(16,185,129,0.1); }
        .tl-action-edit { color: #f0a500; }
        .tl-action-edit:hover { background: rgba(240,165,0,0.1); }
        .tl-action-delete { color: #ef4444; }
        .tl-action-delete:hover { background: rgba(239,68,68,0.1); }

        .tl-empty {
          text-align: center;
          padding: 80px 40px;
          color: #333;
        }
        .tl-empty-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #2a2a2a;
          margin-bottom: 12px;
        }
        .tl-loading {
          text-align: center;
          padding: 80px;
          color: #555;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="tl-root">
        <div className="tl-header">
          <h1 className="tl-title">Teams <span>Management</span></h1>
          <button className="tl-btn" onClick={() => navigate('/teams/new')}>
            + New Team
          </button>
        </div>

        {error && <div className="tl-error">{error}</div>}

        {loading ? (
          <div className="tl-loading">Loading Teams...</div>
        ) : teams.length === 0 ? (
          <div className="tl-empty">
            <div className="tl-empty-title">No Teams Found</div>
            <p style={{ color: '#444', marginBottom: '24px', fontSize: '14px' }}>
              Create your first team to get started
            </p>
            <button className="tl-btn" onClick={() => navigate('/teams/new')}>
              + Create First Team
            </button>
          </div>
        ) : (
          <div className="tl-grid">
            {teams.map((team) => (
              <div
                key={team._id}
                className="tl-card"
                style={{ '--accent': specializationColor(team.specialization) }}
              >
                <div className="tl-card-header">
                  <div className="tl-card-name">{team.teamName}</div>
                  <span className="tl-badge">{team.specialization}</span>
                </div>
                <div className="tl-card-body">
                  <p className="tl-desc">
                    {team.description || 'No description provided'}
                  </p>
                  <div className="tl-members">
                    👥 {team.members?.length || 0} Member(s)
                  </div>
                  {team.members?.length > 0 && (
                    <div className="tl-member-tags">
                      {team.members.slice(0, 3).map((m) => (
                        <span key={m._id} className="tl-member-tag">
                          {m.fullName}
                        </span>
                      ))}
                      {team.members.length > 3 && (
                        <span className="tl-member-tag">
                          +{team.members.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="tl-card-actions">
                  <button
                    className="tl-action-btn tl-action-view"
                    onClick={() => navigate(`/teams/${team._id}`)}
                  >View</button>
                  <button
                    className="tl-action-btn tl-action-edit"
                    onClick={() => navigate(`/teams/edit/${team._id}`)}
                  >Edit</button>
                  <button
                    className="tl-action-btn tl-action-delete"
                    onClick={() => handleDelete(team._id)}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}