import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requestService from '../../services/requestService';

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => { fetchRequest(); }, [id]);

  const fetchRequest = async () => {
    try {
      const res = await requestService.getRequestById(id);
      setRequest(res.data);
    } catch {
      setError('Failed to load request details');
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await requestService.updateStatus(id, newStatus);
      fetchRequest();
    } catch {
      setError('Failed to update status');
    }
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await requestService.deleteRequest(id);
        navigate('/requests');
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

  const nextStatuses = {
    'New': ['Assigned'],
    'Assigned': ['In Progress'],
    'In Progress': ['Repaired', 'Scrapped'],
    'Repaired': [],
    'Scrapped': [],
  };

  const isOverdue = request?.scheduledDate &&
    new Date(request.scheduledDate) < new Date() &&
    !['Repaired', 'Scrapped'].includes(request?.status);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '22px', letterSpacing: '2px', textTransform: 'uppercase' }}>
      Loading Request...
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rd-root {
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
          padding: 40px;
        }
        .rd-back {
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
        }
        .rd-back:hover { color: #ffd166; }

        .rd-card {
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

        .rd-banner {
          padding: 28px 32px;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }
        .rd-subject {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 10px;
        }
        .rd-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .rd-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border: 1px solid var(--bc);
          color: var(--bc);
        }
        .rd-overdue {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border: 1px solid #ef4444;
          color: #ef4444;
          background: rgba(239,68,68,0.1);
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .rd-banner-actions { display: flex; gap: 10px; flex-shrink: 0; }
        .rd-edit-btn {
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
        .rd-edit-btn:hover { background: rgba(240,165,0,0.1); }
        .rd-del-btn {
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
        .rd-del-btn:hover { background: rgba(239,68,68,0.1); }

        .rd-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          border-bottom: 1px solid #1e1e1e;
        }
        .rd-info-item {
          padding: 20px 32px;
          border-right: 1px solid #1e1e1e;
        }
        .rd-info-item:last-child { border-right: none; }
        .rd-info-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 6px;
        }
        .rd-info-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }

        .rd-desc-section {
          padding: 24px 32px;
        }
        .rd-desc-text {
          font-size: 14px;
          color: #666;
          font-weight: 300;
          line-height: 1.7;
        }

        /* STATUS UPDATE */
        .rd-status-card {
          background: #111;
          border: 1px solid #1e1e1e;
          margin-bottom: 20px;
        }
        .rd-status-header {
          padding: 20px 32px;
          border-bottom: 1px solid #1e1e1e;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
        }
        .rd-status-body { padding: 24px 32px; }

        .rd-progress {
          display: flex;
          align-items: center;
          margin-bottom: 28px;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        .rd-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .rd-step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #2a2a2a;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #444;
          font-weight: 700;
          font-family: 'Barlow Condensed', sans-serif;
          transition: all 0.3s;
        }
        .rd-step-circle.done {
          border-color: #10b981;
          background: rgba(16,185,129,0.1);
          color: #10b981;
        }
        .rd-step-circle.current {
          border-color: #f0a500;
          background: rgba(240,165,0,0.1);
          color: #f0a500;
        }
        .rd-step-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #444;
          text-align: center;
        }
        .rd-step-label.done { color: #10b981; }
        .rd-step-label.current { color: #f0a500; }
        .rd-step-line {
          flex: 1;
          height: 2px;
          background: #2a2a2a;
          margin: 0 8px;
          margin-bottom: 24px;
          min-width: 30px;
        }
        .rd-step-line.done { background: #10b981; }

        .rd-next-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .rd-next-btn {
          background: none;
          border: 1px solid #f0a500;
          color: #f0a500;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rd-next-btn:hover { background: rgba(240,165,0,0.1); }
        .rd-next-btn:disabled { border-color: #2a2a2a; color: #444; cursor: not-allowed; }
        .rd-scrap-btn {
          background: none;
          border: 1px solid #ef4444;
          color: #ef4444;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rd-scrap-btn:hover { background: rgba(239,68,68,0.1); }
        .rd-completed-msg {
          color: #10b981;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .rd-error {
          background: rgba(220,53,69,0.1);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 13px;
        }
      `}</style>

      <div className="rd-root">
        <button className="rd-back" onClick={() => navigate('/requests')}>
          ← Back to Requests
        </button>

        {error && <div className="rd-error">{error}</div>}

        {/* Main Card */}
        <div className="rd-card">
          <div className="rd-banner">
            <div>
              <div className="rd-subject">{request?.subject}</div>
              <div className="rd-badges">
                <span
                  className="rd-badge"
                  style={{ '--bc': statusColor(request?.status) }}
                >
                  {request?.status}
                </span>
                <span
                  className="rd-badge"
                  style={{ '--bc': priorityColor(request?.priority) }}
                >
                  {request?.priority}
                </span>
                <span className="rd-badge" style={{ '--bc': request?.requestType === 'Corrective' ? '#ef4444' : '#3b82f6' }}>
                  {request?.requestType}
                </span>
                {isOverdue && (
                  <span className="rd-overdue">⚠ Overdue</span>
                )}
              </div>
            </div>
            <div className="rd-banner-actions">
              <button
                className="rd-edit-btn"
                onClick={() => navigate(`/requests/edit/${id}`)}
              >✏️ Edit</button>
              <button className="rd-del-btn" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="rd-info-grid">
            <div className="rd-info-item">
              <div className="rd-info-label">Equipment</div>
              <div className="rd-info-value">
                {request?.equipmentId?.equipmentName || '—'}
              </div>
            </div>
            <div className="rd-info-item">
              <div className="rd-info-label">Team</div>
              <div className="rd-info-value">
                {request?.teamId?.teamName || '—'}
              </div>
            </div>
            <div className="rd-info-item">
              <div className="rd-info-label">Technician</div>
              <div className="rd-info-value" style={{ fontSize: '15px' }}>
                {request?.assignedTechnicianId?.fullName || '—'}
              </div>
            </div>
            <div className="rd-info-item">
              <div className="rd-info-label">Scheduled</div>
              <div className="rd-info-value" style={{ fontSize: '15px' }}>
                {request?.scheduledDate
                  ? new Date(request.scheduledDate).toLocaleDateString()
                  : '—'}
              </div>
            </div>
            <div className="rd-info-item">
              <div className="rd-info-label">Created By</div>
              <div className="rd-info-value" style={{ fontSize: '15px' }}>
                {request?.createdBy?.fullName || '—'}
              </div>
            </div>
            <div className="rd-info-item">
              <div className="rd-info-label">Created At</div>
              <div className="rd-info-value" style={{ fontSize: '15px' }}>
                {new Date(request?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {request?.description && (
            <div className="rd-desc-section">
              <div className="rd-info-label" style={{ marginBottom: '8px' }}>
                Description
              </div>
              <p className="rd-desc-text">{request.description}</p>
            </div>
          )}
        </div>

        {/* Status Update Card */}
        <div className="rd-status-card">
          <div className="rd-status-header">🔄 Update Status</div>
          <div className="rd-status-body">

            {/* Progress Steps */}
            <div className="rd-progress">
              {['New', 'Assigned', 'In Progress', 'Repaired'].map((step, i, arr) => {
                const statOrder = ['New', 'Assigned', 'In Progress', 'Repaired'];
                const currentIdx = statOrder.indexOf(request?.status);
                const stepIdx = statOrder.indexOf(step);
                const isDone = stepIdx < currentIdx;
                const isCurrent = stepIdx === currentIdx;
                return (
                  <>
                    <div key={step} className="rd-step">
                      <div className={`rd-step-circle ${isDone ? 'done' : isCurrent ? 'current' : ''}`}>
                        {isDone ? '✓' : i + 1}
                      </div>
                      <div className={`rd-step-label ${isDone ? 'done' : isCurrent ? 'current' : ''}`}>
                        {step}
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`rd-step-line ${stepIdx < currentIdx ? 'done' : ''}`} />
                    )}
                  </>
                );
              })}
            </div>

            {/* Next Action Buttons */}
            <div className="rd-next-actions">
              {nextStatuses[request?.status]?.length === 0 ? (
                <div className="rd-completed-msg">
                  ✅ Request {request?.status} — No further actions needed
                </div>
              ) : (
                <>
                  {nextStatuses[request?.status]?.map((next) => (
                    next === 'Scrapped' ? (
                      <button
                        key={next}
                        className="rd-scrap-btn"
                        onClick={() => handleStatusUpdate(next)}
                        disabled={updating}
                      >
                        🗑️ Mark as Scrapped
                      </button>
                    ) : (
                      <button
                        key={next}
                        className="rd-next-btn"
                        onClick={() => handleStatusUpdate(next)}
                        disabled={updating}
                      >
                        → Move to {next}
                      </button>
                    )
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}