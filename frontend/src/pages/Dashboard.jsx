import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import equipmentService from '../services/equipmentService';
import teamService from '../services/teamService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEquipment: 0,
    activeRequests: 0,
    teams: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [equipmentRes, teamsRes] = await Promise.all([
        equipmentService.getAllEquipment(),
        teamService.getAllTeams(),
      ]);
      setStats((prev) => ({
        ...prev,
        totalEquipment: equipmentRes.data?.length || 0,
        teams: teamsRes.data?.length || 0,
      }));
    } catch (err) {
      console.error('Failed to load stats');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const statCards = [
    {
      label: 'Total Equipment',
      value: stats.totalEquipment,
      sub: 'Registered assets',
      icon: '🔧',
      color: '#3b82f6',
      path: '/equipment',
    },
    {
      label: 'Active Requests',
      value: stats.activeRequests,
      sub: 'In progress',
      icon: '⚡',
      color: '#f0a500',
      path: '/requests',
    },
    {
      label: 'Teams',
      value: stats.teams,
      sub: 'Available',
      icon: '👥',
      color: '#10b981',
      path: '/teams',
    },
    {
      label: 'Completed',
      value: stats.completed,
      sub: 'This month',
      icon: '✅',
      color: '#8b5cf6',
      path: '/requests',
    },
  ];

  const quickActions = [
    { label: 'Add Equipment', icon: '🔧', path: '/equipment/new', color: '#3b82f6' },
    { label: 'New Request', icon: '📋', path: '/requests/new', color: '#f0a500' },
    { label: 'Create Team', icon: '👥', path: '/teams/new', color: '#10b981' },
    { label: 'View Reports', icon: '📊', path: '/reports', color: '#8b5cf6' },
  ];

  const navItems = [
    { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { label: 'Equipment', icon: '🔧', path: '/equipment' },
    { label: 'Requests', icon: '📋', path: '/requests' },
    { label: 'Teams', icon: '👥', path: '/teams' },
    { label: 'Calendar', icon: '📅', path: '/calendar' },
    { label: 'Reports', icon: '📊', path: '/reports' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .db-root {
          display: flex;
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
        }

        /* SIDEBAR */
        .db-sidebar {
          width: 260px;
          background: #111;
          border-right: 1px solid #1e1e1e;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
        }
        .db-logo {
          padding: 28px 24px;
          border-bottom: 1px solid #1e1e1e;
        }
        .db-logo-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #fff;
        }
        .db-logo-text span { color: #f0a500; }
        .db-logo-sub {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #333;
          margin-top: 4px;
        }

        .db-nav { flex: 1; padding: 16px 0; }
        .db-nav-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #333;
          padding: 0 24px;
          margin-bottom: 8px;
          margin-top: 16px;
        }
        .db-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          border-left: 3px solid transparent;
          font-size: 14px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
        }
        .db-nav-item:hover {
          background: #1a1a1a;
          color: #fff;
          border-left-color: #f0a500;
        }
        .db-nav-item.active {
          background: #1a1a1a;
          color: #fff;
          border-left-color: #f0a500;
        }
        .db-nav-icon { font-size: 16px; width: 20px; text-align: center; }

        .db-sidebar-footer {
          padding: 20px 24px;
          border-top: 1px solid #1e1e1e;
        }
        .db-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .db-user-avatar {
          width: 36px;
          height: 36px;
          background: #f0a500;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .db-user-name {
          font-size: 13px;
          font-weight: 500;
          color: #fff;
        }
        .db-user-role {
          font-size: 11px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .db-logout {
          width: 100%;
          background: none;
          border: 1px solid #2a2a2a;
          color: #555;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .db-logout:hover { border-color: #ef4444; color: #ef4444; }

        /* MAIN CONTENT */
        .db-main {
          margin-left: 260px;
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        /* TOP BAR */
        .db-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }
        .db-page-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 48px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
        }
        .db-page-title span { color: #f0a500; }
        .db-date {
          font-size: 13px;
          color: #555;
          margin-top: 6px;
        }
        .db-new-req-btn {
          background: #f0a500;
          border: none;
          color: #000;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 28px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .db-new-req-btn:hover { background: #ffd166; }

        /* STAT CARDS */
        .db-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .db-stat-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-top: 3px solid var(--card-color);
          padding: 24px;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
        }
        .db-stat-card:hover {
          transform: translateY(-3px);
          border-color: var(--card-color);
        }
        .db-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .db-stat-label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
          font-weight: 600;
        }
        .db-stat-icon {
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .db-stat-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 52px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
        }
        .db-stat-sub {
          font-size: 12px;
          color: var(--card-color);
          font-weight: 500;
        }

        /* BOTTOM GRID */
        .db-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        /* QUICK ACTIONS */
        .db-section-card {
          background: #111;
          border: 1px solid #1e1e1e;
        }
        .db-section-header {
          padding: 20px 24px;
          border-bottom: 1px solid #1e1e1e;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
        }
        .db-section-body { padding: 20px 24px; }

        .db-quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .db-quick-btn {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          color: #fff;
          padding: 16px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .db-quick-btn:hover {
          background: #222;
          border-color: var(--btn-color);
        }
        .db-quick-icon {
          font-size: 20px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
        }
        .db-quick-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--btn-color);
        }

        /* STATUS OVERVIEW */
        .db-status-list { display: flex; flex-direction: column; gap: 12px; }
        .db-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .db-status-label {
          font-size: 13px;
          color: #888;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .db-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dot-color);
        }
        .db-status-bar-wrap {
          flex: 1;
          height: 4px;
          background: #1a1a1a;
          margin: 0 16px;
        }
        .db-status-bar {
          height: 100%;
          background: var(--dot-color);
          width: var(--bar-width);
          transition: width 0.5s ease;
        }
        .db-status-count {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          min-width: 24px;
          text-align: right;
        }

        /* MODULE SHORTCUTS */
        .db-modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .db-module-card {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          padding: 20px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          text-align: center;
        }
        .db-module-card:hover {
          background: #222;
          border-color: #f0a500;
          transform: translateY(-2px);
        }
        .db-module-icon { font-size: 28px; margin-bottom: 10px; }
        .db-module-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 4px;
        }
        .db-module-desc { font-size: 11px; color: #444; }

        .db-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #333;
        }

        @media (max-width: 1024px) {
          .db-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .db-bottom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .db-sidebar { display: none; }
          .db-main { margin-left: 0; padding: 20px; }
          .db-stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="db-root">
        {/* SIDEBAR */}
        <aside className="db-sidebar">
          <div className="db-logo">
            <div className="db-logo-text">Gear<span>Guard</span></div>
            <div className="db-logo-sub">Maintenance Tracker</div>
          </div>

          <nav className="db-nav">
            <div className="db-nav-label">Main Menu</div>
            {navItems.map((item) => (
              <div
                key={item.path}
                className={`db-nav-item ${window.location.pathname === item.path ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="db-nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>

          <div className="db-sidebar-footer">
            <div className="db-user-info">
              <div className="db-user-avatar">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="db-user-name">{user?.fullName || 'User'}</div>
                <div className="db-user-role">{user?.role || 'Member'}</div>
              </div>
            </div>
            <button className="db-logout" onClick={handleLogout}>
              ⎋ Logout
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="db-main">
          {/* Top Bar */}
          <div className="db-topbar">
            <div>
              <h1 className="db-page-title">
                Dash<span>board</span>
              </h1>
              <div className="db-date">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric',
                  month: 'long', day: 'numeric'
                })}
              </div>
            </div>
            <button
              className="db-new-req-btn"
              onClick={() => navigate('/requests/new')}
            >
              + New Request
            </button>
          </div>

          {loading ? (
            <div className="db-loading">Loading Dashboard...</div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="db-stats-grid">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className="db-stat-card"
                    style={{ '--card-color': card.color }}
                    onClick={() => navigate(card.path)}
                  >
                    <div className="db-stat-header">
                      <div className="db-stat-label">{card.label}</div>
                      <div className="db-stat-icon">{card.icon}</div>
                    </div>
                    <div className="db-stat-value">{card.value}</div>
                    <div className="db-stat-sub">{card.sub}</div>
                  </div>
                ))}
              </div>

              {/* Bottom Grid */}
              <div className="db-bottom-grid">
                {/* Quick Actions */}
                <div className="db-section-card">
                  <div className="db-section-header">⚡ Quick Actions</div>
                  <div className="db-section-body">
                    <div className="db-quick-actions">
                      {quickActions.map((action) => (
                        <button
                          key={action.label}
                          className="db-quick-btn"
                          style={{ '--btn-color': action.color }}
                          onClick={() => navigate(action.path)}
                        >
                          <div className="db-quick-icon">{action.icon}</div>
                          <div className="db-quick-label">{action.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Request Status Overview */}
                <div className="db-section-card">
                  <div className="db-section-header">📊 Request Status</div>
                  <div className="db-section-body">
                    <div className="db-status-list">
                      {[
                        { label: 'New', color: '#3b82f6', count: 0 },
                        { label: 'Assigned', color: '#f0a500', count: 0 },
                        { label: 'In Progress', color: '#8b5cf6', count: 0 },
                        { label: 'Repaired', color: '#10b981', count: 0 },
                        { label: 'Scrapped', color: '#ef4444', count: 0 },
                      ].map((s) => (
                        <div key={s.label} className="db-status-row">
                          <div className="db-status-label">
                            <div
                              className="db-status-dot"
                              style={{ '--dot-color': s.color }}
                            />
                            {s.label}
                          </div>
                          <div
                            className="db-status-bar-wrap"
                          >
                            <div
                              className="db-status-bar"
                              style={{
                                '--dot-color': s.color,
                                '--bar-width': `${s.count}%`,
                              }}
                            />
                          </div>
                          <div className="db-status-count">{s.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Shortcuts */}
              <div className="db-section-card">
                <div className="db-section-header">🧭 Navigate Modules</div>
                <div className="db-section-body">
                  <div className="db-modules-grid">
                    {[
                      { icon: '🔧', name: 'Equipment', desc: 'Manage all assets', path: '/equipment' },
                      { icon: '📋', name: 'Requests', desc: 'Track maintenance', path: '/requests' },
                      { icon: '👥', name: 'Teams', desc: 'Manage technicians', path: '/teams' },
                      { icon: '📅', name: 'Calendar', desc: 'Schedule maintenance', path: '/calendar' },
                      { icon: '📊', name: 'Reports', desc: 'View analytics', path: '/reports' },
                      { icon: '⚙️', name: 'Settings', desc: 'App configuration', path: '/settings' },
                    ].map((mod) => (
                      <div
                        key={mod.name}
                        className="db-module-card"
                        onClick={() => navigate(mod.path)}
                      >
                        <div className="db-module-icon">{mod.icon}</div>
                        <div className="db-module-name">{mod.name}</div>
                        <div className="db-module-desc">{mod.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}