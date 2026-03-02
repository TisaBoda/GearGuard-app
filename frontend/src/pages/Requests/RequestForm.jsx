import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requestService from '../../services/requestService';
import equipmentService from '../../services/equipmentService';
import teamService from '../../services/teamService';

export default function RequestForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    requestType: 'Corrective',
    equipmentId: '',
    teamId: '',
    assignedTechnicianId: '',
    priority: 'Medium',
    status: 'New',
    scheduledDate: '',
  });

  const [equipmentList, setEquipmentList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [technicianList, setTechnicianList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDropdowns();
    if (isEditing) fetchRequest();
  }, [id]);

  const fetchDropdowns = async () => {
    try {
      const [eqRes, teamRes] = await Promise.all([
        equipmentService.getAllEquipment(),
        teamService.getAllTeams(),
      ]);
      setEquipmentList(eqRes.data || []);
      setTeamList(teamRes.data || []);
    } catch {
      setError('Failed to load form data');
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await requestService.getRequestById(id);
      const r = res.data;
      setFormData({
        subject: r.subject || '',
        description: r.description || '',
        requestType: r.requestType || 'Corrective',
        equipmentId: r.equipmentId?._id || '',
        teamId: r.teamId?._id || '',
        assignedTechnicianId: r.assignedTechnicianId?._id || '',
        priority: r.priority || 'Medium',
        status: r.status || 'New',
        scheduledDate: r.scheduledDate
          ? r.scheduledDate.split('T')[0]
          : '',
      });
      // Load technicians for selected team
      if (r.teamId) {
        const team = teamList.find((t) => t._id === r.teamId._id);
        if (team) setTechnicianList(team.members || []);
      }
    } catch {
      setError('Failed to load request');
    }
  };

  // Auto-fill team when equipment is selected
  const handleEquipmentChange = (e) => {
    const eqId = e.target.value;
    const selected = equipmentList.find((eq) => eq._id === eqId);
    setFormData((prev) => ({
      ...prev,
      equipmentId: eqId,
      teamId: selected?.teamId || prev.teamId,
    }));
    // Load technicians if team is auto-filled
    if (selected?.teamId) {
      const team = teamList.find((t) => t._id === selected.teamId);
      setTechnicianList(team?.members || []);
    }
  };

  // Load technicians when team changes
  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setFormData((prev) => ({ ...prev, teamId, assignedTechnicianId: '' }));
    const team = teamList.find((t) => t._id === teamId);
    setTechnicianList(team?.members || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.equipmentId || !formData.requestType) {
      setError('Subject, Equipment and Request Type are required!');
      return;
    }
    setLoading(true);
    try {
      if (isEditing) {
        await requestService.updateRequest(id, formData);
      } else {
        await requestService.createRequest(formData);
      }
      navigate('/requests');
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

        .rf-root {
          min-height: 100vh;
          background: #0d0d0d;
          font-family: 'Barlow', sans-serif;
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .rf-card {
          width: 100%;
          max-width: 680px;
          background: #111;
          border: 1px solid #1e1e1e;
          border-top: 3px solid #f0a500;
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rf-header {
          padding: 28px 32px;
          border-bottom: 1px solid #1e1e1e;
        }
        .rf-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 36px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 4px;
        }
        .rf-subtitle {
          font-size: 13px;
          color: #555;
          font-weight: 300;
        }
        .rf-body { padding: 32px; }

        .rf-error {
          background: rgba(220,53,69,0.1);
          border: 1px solid rgba(220,53,69,0.3);
          border-left: 3px solid #dc3545;
          color: #ff6b7a;
          font-size: 13px;
          padding: 12px 16px;
          margin-bottom: 24px;
        }

        .rf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .rf-grid-full { grid-column: 1 / -1; }

        .rf-group { margin-bottom: 0; }
        .rf-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 8px;
        }
        .rf-required { color: #f0a500; }
        .rf-input, .rf-select, .rf-textarea {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-bottom: 2px solid #333;
          color: #fff;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .rf-input:focus, .rf-select:focus, .rf-textarea:focus {
          border-color: #f0a500;
          background: #1f1f1f;
        }
        .rf-input::placeholder, .rf-textarea::placeholder { color: #3a3a3a; }
        .rf-select option { background: #1a1a1a; color: #fff; }
        .rf-textarea { resize: vertical; min-height: 100px; }

        .rf-autofill-note {
          font-size: 11px;
          color: #f0a500;
          margin-top: 6px;
        }

        .rf-type-row {
          display: flex;
          gap: 12px;
          margin-bottom: 0;
        }
        .rf-type-btn {
          flex: 1;
          padding: 12px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          color: #555;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .rf-type-btn.corrective.active {
          border-color: #ef4444;
          color: #ef4444;
          background: rgba(239,68,68,0.1);
        }
        .rf-type-btn.preventive.active {
          border-color: #3b82f6;
          color: #3b82f6;
          background: rgba(59,130,246,0.1);
        }
        .rf-type-btn:hover { border-color: #555; color: #fff; }

        .rf-actions {
          display: flex;
          gap: 12px;
          padding: 20px 32px;
          border-top: 1px solid #1e1e1e;
          margin-top: 32px;
        }
        .rf-cancel {
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
          transition: all 0.2s;
        }
        .rf-cancel:hover { border-color: #555; color: #fff; }
        .rf-submit {
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
        .rf-submit:hover { background: #ffd166; }
        .rf-submit:disabled { background: #333; color: #666; cursor: not-allowed; }
        .rf-spinner {
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

      <div className="rf-root">
        <div className="rf-card">
          <div className="rf-header">
            <h1 className="rf-title">
              {isEditing ? 'Edit Request' : 'New Request'}
            </h1>
            <p className="rf-subtitle">
              {isEditing
                ? 'Update the maintenance request details'
                : 'Fill in the details to create a maintenance request'}
            </p>
          </div>

          <div className="rf-body">
            {error && <div className="rf-error">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="rf-grid">

                {/* Request Type */}
                <div className="rf-group rf-grid-full">
                  <label className="rf-label">
                    Request Type <span className="rf-required">*</span>
                  </label>
                  <div className="rf-type-row">
                    <button
                      type="button"
                      className={`rf-type-btn corrective ${formData.requestType === 'Corrective' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, requestType: 'Corrective' })}
                    >
                      🔴 Corrective
                    </button>
                    <button
                      type="button"
                      className={`rf-type-btn preventive ${formData.requestType === 'Preventive' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, requestType: 'Preventive' })}
                    >
                      🔵 Preventive
                    </button>
                  </div>
                </div>

                {/* Subject */}
                <div className="rf-group rf-grid-full">
                  <label className="rf-label">
                    Subject <span className="rf-required">*</span>
                  </label>
                  <input
                    className="rf-input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. AC unit not cooling properly"
                  />
                </div>

                {/* Equipment */}
                <div className="rf-group">
                  <label className="rf-label">
                    Equipment <span className="rf-required">*</span>
                  </label>
                  <select
                    className="rf-select"
                    name="equipmentId"
                    value={formData.equipmentId}
                    onChange={handleEquipmentChange}
                  >
                    <option value="">-- Select Equipment --</option>
                    {equipmentList.map((eq) => (
                      <option key={eq._id} value={eq._id}>
                        {eq.equipmentName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div className="rf-group">
                  <label className="rf-label">Priority</label>
                  <select
                    className="rf-select"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Critical">🔴 Critical</option>
                    <option value="High">🟠 High</option>
                    <option value="Medium">🔵 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>

                {/* Team - Auto filled */}
                <div className="rf-group">
                  <label className="rf-label">Team</label>
                  <select
                    className="rf-select"
                    name="teamId"
                    value={formData.teamId}
                    onChange={handleTeamChange}
                  >
                    <option value="">-- Select Team --</option>
                    {teamList.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.teamName}
                      </option>
                    ))}
                  </select>
                  {formData.teamId && (
                    <div className="rf-autofill-note">
                      ⚡ Auto-filled from equipment
                    </div>
                  )}
                </div>

                {/* Technician */}
                <div className="rf-group">
                  <label className="rf-label">Assigned Technician</label>
                  <select
                    className="rf-select"
                    name="assignedTechnicianId"
                    value={formData.assignedTechnicianId}
                    onChange={handleChange}
                    disabled={technicianList.length === 0}
                  >
                    <option value="">-- Select Technician --</option>
                    {technicianList.map((tech) => (
                      <option key={tech._id} value={tech._id}>
                        {tech.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Scheduled Date */}
                <div className="rf-group">
                  <label className="rf-label">Scheduled Date</label>
                  <input
                    className="rf-input"
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Status (only when editing) */}
                {isEditing && (
                  <div className="rf-group">
                    <label className="rf-label">Status</label>
                    <select
                      className="rf-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Repaired">Repaired</option>
                      <option value="Scrapped">Scrapped</option>
                    </select>
                  </div>
                )}

                {/* Description */}
                <div className="rf-group rf-grid-full">
                  <label className="rf-label">Description</label>
                  <textarea
                    className="rf-textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue or maintenance needed..."
                  />
                </div>

              </div>
            </form>
          </div>

          <div className="rf-actions">
            <button className="rf-cancel" onClick={() => navigate('/requests')}>
              Cancel
            </button>
            <button
              className="rf-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <span className="rf-spinner" />}
              {loading
                ? 'Saving...'
                : isEditing
                ? 'Update Request'
                : 'Create Request'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}