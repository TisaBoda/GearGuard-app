import { useState, useEffect } from 'react';
import requestService from '../../services/requestService';
import equipmentService from '../../services/equipmentService';
import teamService from '../../services/teamService';

export default function ReportsPage() {
  const [requests, setRequests] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [rRes, eRes, tRes] = await Promise.all([
        requestService.getAllRequests(),
        equipmentService.getAllEquipment(),
        teamService.getAllTeams(),
      ]);
      setRequests(rRes.data || []);
      setEquipment(eRes.data || []);
      setTeams(tRes.data || []);
    } catch { }
    setLoading(false);
  };

  const byStatus = (status) => requests.filter((r) => r.status === status).length;
  const byType = (type) => requests.filter((r) => r.requestType === type).length;
  const byPriority = (p) => requests.filter((r) => r.priority === p).length;

  const requestsByTeam = teams.map((t) => ({
    name: t.teamName,
    count: requests.filter((r) => r.teamId?._id === t._id || r.teamId === t._id).length,
  }));

  const statusList = [
    { label: 'New', color: '#3b82f6' },
    { label: 'Assigned', color: '#f0a500' },
    { label: 'In Progress', color: '#8b5cf6' },
    { label: 'Repaired', color: '#10b981' },
    { label: 'Scrapped', color: '#ef4444' },
  ];

  const maxTeamCount = Math.max(...requestsByTeam.map((t) => t.count), 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .rp-root {
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
          padding: 40px;
        }
        .rp-header {
          margin-bottom: 32px;
          border-bottom: 1px solid #1e1e1e;
          padding-bottom: 24px;
        }
        .rp-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
        }
        .rp-title span { color: #f0a500; }
        .rp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .rp-card {
          background: #111;
          border: 1px solid #1e1e1e;
        }
        .rp-card-header {
          padding: 20px 24px;
          border-bottom: 1px solid #1e1e1e;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
        }
        .rp-card-body { padding: 24px; }
        .rp-stat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .rp-stat-row:last-child { margin-bottom: 0; }
        .rp-stat-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #888;
        }
        .rp-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dc);
          flex-shrink: 0;
        }
        .rp-bar-wrap {
          flex: 1;
          height: 6px;
          background: #1a1a1a;
          margin: 0 16px;
          border-radius: 3px;
        }
        .rp-bar {
          height: 100%;
          background: var(--dc);
          border-radius: 3px;
          width: var(--bw);
          transition: width 0.5s ease;
        }
        .rp-stat-count {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          min-width: 30px;
          text-align: right;
        }
        .rp-summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        .rp-summary-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-top: 3px solid var(--sc);
          padding: 20px;
          text-align: center;
        }
        .rp-summary-val {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
        }
        .rp-summary-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
        }
        .rp-loading {
          text-align: center;
          padding: 80px;
          color: #555;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .rp-grid { grid-template-columns: 1fr; }
          .rp-summary-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="rp-root">
        <div className="rp-header">
          <h1 className="rp-title">Reports & <span>Analytics</span></h1>
        </div>

        {loading ? (
          <div className="rp-loading">Loading Reports...</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="rp-summary-grid">
              {[
                { label: 'Total Equipment', val: equipment.length, color: '#3b82f6' },
                { label: 'Total Requests', val: requests.length, color: '#f0a500' },
                { label: 'Total Teams', val: teams.length, color: '#10b981' },
                { label: 'Completed', val: byStatus('Repaired'), color: '#8b5cf6' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rp-summary-card"
                  style={{ '--sc': s.color }}
                >
                  <div className="rp-summary-val">{s.val}</div>
                  <div className="rp-summary-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="rp-grid">
              {/* Requests by Status */}
              <div className="rp-card">
                <div className="rp-card-header">📊 Requests by Status</div>
                <div className="rp-card-body">
                  {statusList.map((s) => {
                    const count = byStatus(s.label);
                    const pct = requests.length
                      ? Math.round((count / requests.length) * 100)
                      : 0;
                    return (
                      <div key={s.label} className="rp-stat-row">
                        <div className="rp-stat-label">
                          <div className="rp-dot" style={{ '--dc': s.color }} />
                          {s.label}
                        </div>
                        <div className="rp-bar-wrap">
                          <div
                            className="rp-bar"
                            style={{ '--dc': s.color, '--bw': `${pct}%` }}
                          />
                        </div>
                        <div className="rp-stat-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Requests by Priority */}
              <div className="rp-card">
                <div className="rp-card-header">🎯 Requests by Priority</div>
                <div className="rp-card-body">
                  {[
                    { label: 'Critical', color: '#ef4444' },
                    { label: 'High', color: '#f0a500' },
                    { label: 'Medium', color: '#3b82f6' },
                    { label: 'Low', color: '#10b981' },
                  ].map((p) => {
                    const count = byPriority(p.label);
                    const pct = requests.length
                      ? Math.round((count / requests.length) * 100)
                      : 0;
                    return (
                      <div key={p.label} className="rp-stat-row">
                        <div className="rp-stat-label">
                          <div className="rp-dot" style={{ '--dc': p.color }} />
                          {p.label}
                        </div>
                        <div className="rp-bar-wrap">
                          <div
                            className="rp-bar"
                            style={{ '--dc': p.color, '--bw': `${pct}%` }}
                          />
                        </div>
                        <div className="rp-stat-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Requests by Type */}
              <div className="rp-card">
                <div className="rp-card-header">🔀 Requests by Type</div>
                <div className="rp-card-body">
                  {[
                    { label: 'Corrective', color: '#ef4444' },
                    { label: 'Preventive', color: '#3b82f6' },
                  ].map((t) => {
                    const count = byType(t.label);
                    const pct = requests.length
                      ? Math.round((count / requests.length) * 100)
                      : 0;
                    return (
                      <div key={t.label} className="rp-stat-row">
                        <div className="rp-stat-label">
                          <div className="rp-dot" style={{ '--dc': t.color }} />
                          {t.label}
                        </div>
                        <div className="rp-bar-wrap">
                          <div
                            className="rp-bar"
                            style={{ '--dc': t.color, '--bw': `${pct}%` }}
                          />
                        </div>
                        <div className="rp-stat-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Requests by Team */}
              <div className="rp-card">
                <div className="rp-card-header">👥 Requests by Team</div>
                <div className="rp-card-body">
                  {requestsByTeam.length === 0 ? (
                    <div style={{ color: '#444', fontSize: '14px' }}>
                      No teams found
                    </div>
                  ) : (
                    requestsByTeam.map((t) => {
                      const pct = Math.round((t.count / maxTeamCount) * 100);
                      return (
                        <div key={t.name} className="rp-stat-row">
                          <div className="rp-stat-label">
                            <div className="rp-dot" style={{ '--dc': '#f0a500' }} />
                            {t.name}
                          </div>
                          <div className="rp-bar-wrap">
                            <div
                              className="rp-bar"
                              style={{ '--dc': '#f0a500', '--bw': `${pct}%` }}
                            />
                          </div>
                          <div className="rp-stat-count">{t.count}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}