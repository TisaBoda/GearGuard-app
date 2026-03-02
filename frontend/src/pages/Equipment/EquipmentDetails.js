import { useState, useEffect } from 'react';
import equipmentService from '../../services/equipmentService';

export default function EquipmentDetails() {
  const id = window.location.pathname.split('/').pop();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    equipmentService.getEquipment(id).then(data => {
      setEquipment(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    if (!window.confirm('Delete this equipment?')) return;
    await equipmentService.deleteEquipment(id);
    window.location.href = '/equipment';
  };

  const statusColor = (s) => {
    if (s === 'Active') return '#28a745';
    if (s === 'Under Maintenance') return '#f0a500';
    return '#dc3545';
  };

  if (loading) return <div style={{ background: '#0d0d0d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'Barlow, sans-serif' }}>Loading...</div>;
  if (!equipment) return <div style={{ background: '#0d0d0d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'Barlow, sans-serif' }}>Equipment not found.</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ed-root { min-height: 100vh; background: #0d0d0d; color: #fff; font-family: 'Barlow', sans-serif; padding: 32px; }
        .ed-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
        .ed-header-left { display: flex; align-items: center; gap: 16px; }
        .ed-back { background: none; border: 1px solid #333; color: #888; padding: 8px 16px; cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 13px; transition: all 0.2s; }
        .ed-back:hover { border-color: #f0a500; color: #f0a500; }
        .ed-title { font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
        .ed-title span { color: #f0a500; }
        .ed-btn-row { display: flex; gap: 10px; }
        .ed-btn { background: #f0a500; color: #000; border: none; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; cursor: pointer; transition: background 0.2s; }
        .ed-btn:hover { background: #ffd166; }
        .ed-btn-del { background: transparent; border: 1px solid #dc3545; color: #dc3545; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; cursor: pointer; transition: all 0.2s; }
        .ed-btn-del:hover { background: #dc3545; color: #fff; }
        .ed-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .ed-card { background: #111; border: 1px solid #1e1e1e; padding: 28px; }
        .ed-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #f0a500; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #1e1e1e; }
        .ed-field { margin-bottom: 20px; }
        .ed-field-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #555; margin-bottom: 4px; }
        .ed-field-value { font-size: 15px; color: #ccc; }
        .ed-field-value.highlight { color: #fff; font-weight: 500; font-size: 18px; }
        .ed-badge { display: inline-block; padding: 6px 14px; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
        .ed-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ed-requests-btn { width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a; color: #fff; font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 16px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .ed-requests-btn:hover { border-color: #f0a500; color: #f0a500; }
        .ed-badge-count { background: #f0a500; color: #000; font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 10px; }
        @media (max-width: 768px) { .ed-grid { grid-template-columns: 1fr; } .ed-info-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ed-root">
        <div className="ed-header">
          <div className="ed-header-left">
            <button className="ed-back" onClick={() => window.location.href = '/equipment'}>← Back</button>
            <div className="ed-title">Equipment <span>Details</span></div>
          </div>
          <div className="ed-btn-row">
            <button className="ed-btn" onClick={() => window.location.href = `/equipment/edit/${id}`}>Edit</button>
            <button className="ed-btn-del" onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <div className="ed-grid">
          {/* LEFT - Main Info */}
          <div>
            <div className="ed-card" style={{ marginBottom: 24 }}>
              <div className="ed-card-title">General Information</div>
              <div className="ed-field">
                <div className="ed-field-label">Equipment Name</div>
                <div className="ed-field-value highlight">{equipment.equipmentName}</div>
              </div>
              <div className="ed-info-grid">
                <div className="ed-field">
                  <div className="ed-field-label">Serial Number</div>
                  <div className="ed-field-value" style={{ fontFamily: 'monospace' }}>{equipment.serialNumber}</div>
                </div>
                <div className="ed-field">
                  <div className="ed-field-label">Category</div>
                  <div className="ed-field-value">{equipment.category}</div>
                </div>
                <div className="ed-field">
                  <div className="ed-field-label">Department</div>
                  <div className="ed-field-value">{equipment.department}</div>
                </div>
                <div className="ed-field">
                  <div className="ed-field-label">Location</div>
                  <div className="ed-field-value">{equipment.location || '—'}</div>
                </div>
                <div className="ed-field">
                  <div className="ed-field-label">Purchase Date</div>
                  <div className="ed-field-value">{equipment.purchaseDate ? new Date(equipment.purchaseDate).toLocaleDateString() : '—'}</div>
                </div>
                <div className="ed-field">
                  <div className="ed-field-label">Warranty Expiry</div>
                  <div className="ed-field-value">{equipment.warrantyExpiryDate ? new Date(equipment.warrantyExpiryDate).toLocaleDateString() : '—'}</div>
                </div>
              </div>
              {equipment.description && (
                <div className="ed-field">
                  <div className="ed-field-label">Description</div>
                  <div className="ed-field-value">{equipment.description}</div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - Status & Requests */}
          <div>
            <div className="ed-card" style={{ marginBottom: 24 }}>
              <div className="ed-card-title">Status</div>
              <div className="ed-field">
                <div className="ed-field-label">Current Status</div>
                <span className="ed-badge" style={{ color: statusColor(equipment.status), border: `1px solid ${statusColor(equipment.status)}` }}>
                  {equipment.status}
                </span>
              </div>
              <div className="ed-field">
                <div className="ed-field-label">Added On</div>
                <div className="ed-field-value">{new Date(equipment.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="ed-field">
                <div className="ed-field-label">Last Updated</div>
                <div className="ed-field-value">{new Date(equipment.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="ed-card">
              <div className="ed-card-title">Maintenance</div>
              {/* Smart button - will show request count after Phase 5 */}
              <button className="ed-requests-btn" onClick={() => window.location.href = `/requests?equipment=${id}`}>
                View Maintenance Requests
                <span className="ed-badge-count">0</span>
              </button>
              <div style={{ fontSize: 12, color: '#444' }}>
                Badge count will update automatically after Phase 5 (Maintenance Requests module) is built.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}