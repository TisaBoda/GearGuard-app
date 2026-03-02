import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import teamService from '../../services/teamService';

export default function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [addingMember, setAddingMember] = useState(false);
  const [memberError, setMemberError] = useState('');

  useEffect(() => { fetchTeam(); }, [id]);

  const fetchTeam = async () => {
    try {
      const response = await teamService.getTeamById(id);
      setTeam(response.data);
    } catch {
      setError('Failed to load team details');
    }
    setLoading(false);
  };

  const handleAddMember = async () => {
    if (!userId.trim()) { setMemberError('Please enter a User ID'); return; }
    setAddingMember(true);
    setMemberError('');
    try {
      await teamService.addMember(id, userId);
      setUserId('');
      fetchTeam();
    } catch (err) {
      setMemberError(err.response?.data?.message || 'Failed to add member');
    }
    setAddingMember(false);
  };

  const handleRemoveMember = async (memberId) => {
    if (window.confirm('Remove this member from the team?')) {
      try {
        await teamService.removeMember(id, memberId);
        fetchTeam();
      } catch {
        setError('Failed to remove member');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await teamService.deleteTeam(id);
        navigate('/teams');
      } catch {
        setError('Failed to delete team');
      }
    }
  };

  const specializationColor = (s) => ({
    IT: '#3b82f6', Electrical: '#f0a500',
    Mechanical: '#6b7280', HVAC: '#10b981', General: '#8b5cf6'
  }[s] || '#555');

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'Barlow Condensed', fontSize: '22px', letterSpacing: '2px', textTransform: 'uppercase' }}>
      Loading Team...
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .td-root {
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
          padding: 40px;
        }
        .td-back {
          background: none;
          border: none;
          color: #f0a500;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .td-back:hover { color: #ffd166; }

        .td-header-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-top: 3px solid #f0a500;
          margin-bottom: 20px;
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .td-banner {
          padding: 28px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1e1e1e;
        }
        .td-team-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 38px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 8px;
        }
        .td-spec-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border: 1px solid;
          color: var(--spec-color);
          border-color: var(--spec-color);
          background: transparent;
        }
        .td-banner-actions {
          display: flex;
          gap: 10px;
        }
        .td-edit-btn {
          background: none;
          border: 1px solid #f0a500;
          color: #f0a500;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px 20px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .td-edit-btn:hover { background: rgba(240,165,0,0.1); }
        .td-delete-btn {
          background: none;
          border: 1px solid #ef4444;
          color: #ef4444;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px 20px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .td-delete-btn:hover { background: rgba(239,68,68,0.1); }

        .td-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 0;
          border-bottom: 1px solid #1e1e1e;
        }
        .td-info-item {
          padding: 20px 32px;
          border-right: 1px solid #1e1e1e;
        }
        .td-info-item:last-child { border-right: none; }
        .td-info-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 6px;
        }
        .td-info-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
        }
        .td-desc-section {
          padding: 20px 32px;
        }
        .td-desc-text {
          font-size: 14px;
          color: #555;
          font-weight: 300;
          line-height: 1.7;
        }

        .td-members-card {
          background: #111;
          border: 1px solid #1e1e1e;
          animation: fadeUp 0.5s ease both;
        }
        .td-members-header {
          padding: 20px 32px;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .td-members-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
        }
        .td-members-count {
          font-size: 12px;
          color: #f0a500;
          background: rgba(240,165,0,0.1);
          border: 1px solid rgba(240,165,0,0.3);
          padding: 3px 10px;
          font-weight: 600;
        }

        .td-add-member {
          padding: 20px 32px;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          gap: 10px;
        }
        .td-member-input {
          flex: 1;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-bottom: 2px solid #333;
          color: #fff;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.2s;
        }
        .td-member-input:focus { border-color: #f0a500; }
        .td-member-input::placeholder { color: #3a3a3a; }
        .td-add-btn {
          background: #f0a500;
          border: none;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .td-add-btn:hover { background: #ffd166; }
        .td-add-btn:disabled { background: #333; color: #666; cursor: not-allowed; }

        .td-member-error {
          margin: 0 32px 12px;
          background: rgba(220,53,69,0.1);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          padding: 10px 14px;
          font-size: 13px;
        }

        .td-members-list { padding: 16px 32px 24px; }
        .td-member-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #1a1a1a;
        }
        .td-member-row:last-child { border-bottom: none; }
        .td-avatar {
          width: 42px;
          height: 42px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          color: #f0a500;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .td-member-info { flex: 1; }
        .td-member-name {
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 3px;
        }
        .td-member-email { font-size: 12px; color: #555; }
        .td-member-role {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #f0a500;
        }
        .td-remove-btn {
          background: none;
          border: 1px solid #2a2a2a;
          color: #ef4444;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 14px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .td-remove-btn:hover {
          border-color: #ef4444;
          background: rgba(239,68,68,0.1);
        }
        .td-empty-members {
          text-align: center;
          padding: 40px;
          color: #333;
          font-size: 14px;
        }

        .td-error {
          background: rgba(220,53,69,0.1);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 13px;
        }
      `}</style>

      <div className="td-root">
        <button className="td-back" onClick={() => navigate('/teams')}>
          ← Back to Teams
        </button>

        {error && <div className="td-error">{error}</div>}

        {/* Header Card */}
        <div className="td-header-card">
          <div className="td-banner">
            <div>
              <div className="td-team-name">{team?.teamName}</div>
              <span
                className="td-spec-badge"
                style={{ '--spec-color': specializationColor(team?.specialization) }}
              >
                {team?.specialization}
              </span>
            </div>
            <div className="td-banner-actions">
              <button className="td-edit-btn" onClick={() => navigate(`/teams/edit/${id}`)}>
                ✏️ Edit
              </button>
              <button className="td-delete-btn" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="td-info-grid">
            <div className="td-info-item">
              <div className="td-info-label">Specialization</div>
              <div className="td-info-value">{team?.specialization}</div>
            </div>
            <div className="td-info-item">
              <div className="td-info-label">Total Members</div>
              <div className="td-info-value">{team?.members?.length || 0}</div>
            </div>
            <div className="td-info-item">
              <div className="td-info-label">Created At</div>
              <div className="td-info-value" style={{ fontSize: '16px' }}>
                {new Date(team?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {team?.description && (
            <div className="td-desc-section">
              <div className="td-info-label" style={{ marginBottom: '8px' }}>Description</div>
              <p className="td-desc-text">{team.description}</p>
            </div>
          )}
        </div>

        {/* Members Card */}
        <div className="td-members-card">
          <div className="td-members-header">
            <div className="td-members-title">Team Members</div>
            <span className="td-members-count">
              {team?.members?.length || 0} total
            </span>
          </div>

          <div className="td-add-member">
            <input
              className="td-member-input"
              type="text"
              placeholder="Enter User ID to add member..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button
              className="td-add-btn"
              onClick={handleAddMember}
              disabled={addingMember}
            >
              {addingMember ? 'Adding...' : '+ Add Member'}
            </button>
          </div>

          {memberError && (
            <div className="td-member-error">{memberError}</div>
          )}

          <div className="td-members-list">
            {!team?.members || team.members.length === 0 ? (
              <div className="td-empty-members">
                No members yet. Add members using their User ID.
              </div>
            ) : (
              team.members.map((member) => (
                <div key={member._id} className="td-member-row">
                  <div className="td-avatar">
                    {member.fullName?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="td-member-info">
                    <div className="td-member-name">{member.fullName}</div>
                    <div className="td-member-email">{member.email}</div>
                    <div className="td-member-role">{member.role}</div>
                  </div>
                  <button
                    className="td-remove-btn"
                    onClick={() => handleRemoveMember(member._id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}