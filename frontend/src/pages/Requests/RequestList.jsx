import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import requestService from '../../services/requestService';

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const response = await requestService.getAllRequests();
      setRequests(response.data);
    } catch {
      setError('Failed to load requests');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await requestService.deleteRequest(id);
        setRequests(requests.filter((r) => r._id !== id));
      } catch {
        setError('Failed to delete request');
      }
    }
  };

  const statusColor = (s) => ({
    'New': '#3b82f6',
    'Assigned': '#f0a500',
    'In Progress': '#8b5cf6',
    'Repaired': '#10b981',
    'Scrapped': '#ef4444',
  }[s] || '#555');

  const priorityColor = (p) => ({
    'Critical': '#ef4444',
    'High': '#f0a500',
    'Medium': '#3b82f6',
    'Low': '#10b981',
  }[p] || '#555');

  const statuses = ['All', 'New', 'Assigned', 'In Progress', 'Repaired', 'Scrapped'];

  const filtered = filter === 'All'
    ? requests
    : requests.filter((r) => r.status === filter);

  const isOverdue = (req) => {
    if (!req.scheduledDate) return false;
    return new Date(req.scheduledDate) < new Date() &&
      !['Repaired', 'Scrapped'].includes(req.status);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rl-root {
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
          padding: 40px;
        }
        .rl-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          border-bottom: 1px solid #1e1e1e;
          padding-bottom: 24px;
        }
        .rl-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
        }
        .rl-title span { color: #f0a500; }
        .rl-btn {
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
        .rl-btn:hover { background: #ffd166; }

        .rl-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .rl-filter-btn {
          background: #111;
          border: 1px solid #2a2a2a;
          color: #555;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .rl-filter-btn:hover { border-color: #f0a500; color: #f0a500; }
        .rl-filter-btn.active {
          background: #f0a500;
          border-color: #f0a500;
          color: #000;
        }

        .rl-error {
          background: rgba(220,53,69,0.1);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 13px;
        }

        .rl-table-wrap {
          background: #111;
          border: 1px solid #1e1e1e;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead {
          border-bottom: 1px solid #1e1e1e;
        }
        th {
          padding: 14px 20px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
        }
        td {
          padding: 16px 20px;
          font-size: 14px;
          color: #ccc;
          border-bottom: 1px solid #1a1a1a;
          vertical-align: middle;
        }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #1a1a1a; }

        .rl-subject {
          font-weight: 500;
          color: #fff;
          max-width: 200px;
        }
        .rl-overdue-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #ef4444;
          border: 1px solid #ef4444;
          padding: 2px 6px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .rl-status-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid var(--sc);
          color: var(--sc);
          background: transparent;
        }
        .rl-priority-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          color: var(--pc);
          background: transparent;
        }
        .rl-type-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          background: rgba(255,255,255,0.05);
          color: #888;
        }
        .rl-actions { display: flex; gap: 8px; }
        .rl-view-btn {
          background: none;
          border: 1px solid #10b981;
          color: #10b981;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rl-view-btn:hover { background: rgba(16,185,129,0.1); }
        .rl-edit-btn {
          background: none;
          border: 1px solid #f0a500;
          color: #f0a500;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rl-edit-btn:hover { background: rgba(240,165,0,0.1); }
        .rl-del-btn {
          background: none;
          border: 1px solid #ef4444;
          color: #ef4444;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rl-del-btn:hover { background: rgba(239,68,68,0.1); }

        .rl-empty {
          text-align: center;
          padding: 60px;
          color: #333;
        }
        .rl-empty-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 24px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .rl-loading {
          text-align: center;
          padding: 80px;
          color: #555;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="rl-root">
        <div className="rl-header">
          <h1 className="rl-title">
            Maintenance <span>Requests</span>
          </h1>
          <button className="rl-btn" onClick={() => navigate('/requests/new')}>
            + New Request
          </button>
        </div>

        {/* Filters */}
        <div className="rl-filters">
          {statuses.map((s) => (
            <button
              key={s}
              className={`rl-filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {error && <div className="rl-error">{error}</div>}

        {loading ? (
          <div className="rl-loading">Loading Requests...</div>
        ) : (
          <div className="rl-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Equipment</th>
                  <th>Team</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Scheduled</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8">
                      <div className="rl-empty">
                        <div className="rl-empty-title">No Requests Found</div>
                        <p style={{ fontSize: '14px', color: '#444' }}>
                          Create your first maintenance request!
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((req) => (
                    <tr key={req._id}>
                      <td>
                        <div className="rl-subject">
                          {req.subject}
                          {isOverdue(req) && (
                            <span className="rl-overdue-badge">OVERDUE</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="rl-type-badge">{req.requestType}</span>
                      </td>
                      <td>{req.equipmentId?.equipmentName || '—'}</td>
                      <td>{req.teamId?.teamName || '—'}</td>
                      <td>
                        <span
                          className="rl-priority-badge"
                          style={{ '--pc': priorityColor(req.priority) }}
                        >
                          {req.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className="rl-status-badge"
                          style={{ '--sc': statusColor(req.status) }}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>
                        {req.scheduledDate
                          ? new Date(req.scheduledDate).toLocaleDateString()
                          : '—'}
                      </td>
                      <td>
                        <div className="rl-actions">
                          <button
                            className="rl-view-btn"
                            onClick={() => navigate(`/requests/${req._id}`)}
                          >View</button>
                          <button
                            className="rl-edit-btn"
                            onClick={() => navigate(`/requests/edit/${req._id}`)}
                          >Edit</button>
                          <button
                            className="rl-del-btn"
                            onClick={() => handleDelete(req._id)}
                          >Del</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}