import { useState, useEffect } from 'react';
import equipmentService from '../../services/equipmentService';

const CATEGORIES = ['Computer', 'Vehicle', 'Machine', 'Office Equipment', 'Other'];
const DEPARTMENTS = ['IT', 'Engineering', 'Facilities', 'Operations', 'HR', 'Finance', 'Other'];
const STATUSES = ['Active', 'Under Maintenance', 'Scrapped'];

export default function EquipmentForm() {
  const isEdit = window.location.pathname.includes('/edit/');
  const id = isEdit ? window.location.pathname.split('/').pop() : null;

  const [form, setForm] = useState({
    equipmentName: '', serialNumber: '', category: '',
    department: '', location: '', description: '',
    purchaseDate: '', warrantyExpiryDate: '', status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      equipmentService.getEquipment(id).then(data => {
        setForm({
          equipmentName: data.equipmentName || '',
          serialNumber: data.serialNumber || '',
          category: data.category || '',
          department: data.department || '',
          location: data.location || '',
          description: data.description || '',
          purchaseDate: data.purchaseDate?.slice(0, 10) || '',
          warrantyExpiryDate: data.warrantyExpiryDate?.slice(0, 10) || '',
          status: data.status || 'Active'
        });
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.equipmentName.trim()) e.equipmentName = 'Name is required';
    if (!form.serialNumber.trim()) e.serialNumber = 'Serial number is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.department) e.department = 'Department is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (isEdit) {
        await equipmentService.updateEquipment(id, form);
        setSuccess('Equipment updated successfully!');
      } else {
        await equipmentService.createEquipment(form);
        setSuccess('Equipment added successfully!');
      }
      setTimeout(() => window.location.href = '/equipment', 1500);
    } catch (err) {
      setErrors({ general: 'Something went wrong. Try again.' });
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ef-root { min-height: 100vh; background: #0d0d0d; color: #fff; font-family: 'Barlow', sans-serif; padding: 32px; }
        .ef-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
        .ef-back { background: none; border: 1px solid #333; color: #888; padding: 8px 16px; cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 13px; transition: all 0.2s; }
        .ef-back:hover { border-color: #f0a500; color: #f0a500; }
        .ef-title { font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
        .ef-title span { color: #f0a500; }
        .ef-card { background: #111; border: 1px solid #1e1e1e; padding: 32px; max-width: 700px; }
        .ef-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ef-full { grid-column: 1 / -1; }
        .ef-label { display: block; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 8px; }
        .ef-input { width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a; border-bottom: 2px solid #333; color: #fff; font-family: 'Barlow', sans-serif; font-size: 14px; padding: 12px 16px; outline: none; transition: border-color 0.2s; appearance: none; }
        .ef-input:focus { border-color: #f0a500; }
        .ef-input.error { border-color: #dc3545; }
        .ef-input::placeholder { color: #333; }
        .ef-err { font-size: 12px; color: #ff6b7a; margin-top: 4px; }
        .ef-success { background: rgba(40,167,69,0.1); border: 1px solid rgba(40,167,69,0.3); border-left: 3px solid #28a745; color: #51cf66; padding: 12px 16px; margin-bottom: 24px; font-size: 14px; }
        .ef-general-err { background: rgba(220,53,69,0.1); border-left: 3px solid #dc3545; color: #ff6b7a; padding: 12px 16px; margin-bottom: 24px; font-size: 14px; }
        .ef-btn-row { display: flex; gap: 12px; margin-top: 24px; }
        .ef-btn { background: #f0a500; color: #000; border: none; font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 14px 32px; cursor: pointer; transition: background 0.2s; }
        .ef-btn:hover { background: #ffd166; }
        .ef-btn:disabled { background: #333; color: #666; cursor: not-allowed; }
        .ef-btn-cancel { background: transparent; border: 1px solid #333; color: #888; font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 14px 24px; cursor: pointer; transition: all 0.2s; }
        .ef-btn-cancel:hover { border-color: #888; color: #ccc; }
        @media (max-width: 600px) { .ef-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ef-root">
        <div className="ef-header">
          <button className="ef-back" onClick={() => window.location.href = '/equipment'}>← Back</button>
          <div className="ef-title">{isEdit ? 'Edit' : 'Add'} <span>Equipment</span></div>
        </div>

        <div className="ef-card">
          {success && <div className="ef-success">{success}</div>}
          {errors.general && <div className="ef-general-err">{errors.general}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="ef-grid">
              <div>
                <label className="ef-label">Equipment Name *</label>
                <input className={`ef-input ${errors.equipmentName ? 'error' : ''}`} name="equipmentName" placeholder="e.g. Dell Laptop" value={form.equipmentName} onChange={handleChange} />
                {errors.equipmentName && <span className="ef-err">{errors.equipmentName}</span>}
              </div>

              <div>
                <label className="ef-label">Serial Number *</label>
                <input className={`ef-input ${errors.serialNumber ? 'error' : ''}`} name="serialNumber" placeholder="e.g. SN-2024-001" value={form.serialNumber} onChange={handleChange} />
                {errors.serialNumber && <span className="ef-err">{errors.serialNumber}</span>}
              </div>

              <div>
                <label className="ef-label">Category *</label>
                <select className={`ef-input ${errors.category ? 'error' : ''}`} name="category" value={form.category} onChange={handleChange}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                {errors.category && <span className="ef-err">{errors.category}</span>}
              </div>

              <div>
                <label className="ef-label">Department *</label>
                <select className={`ef-input ${errors.department ? 'error' : ''}`} name="department" value={form.department} onChange={handleChange}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                </select>
                {errors.department && <span className="ef-err">{errors.department}</span>}
              </div>

              <div>
                <label className="ef-label">Location</label>
                <input className="ef-input" name="location" placeholder="e.g. Floor 2, Room 204" value={form.location} onChange={handleChange} />
              </div>

              <div>
                <label className="ef-label">Status</label>
                <select className="ef-input" name="status" value={form.status} onChange={handleChange}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="ef-label">Purchase Date</label>
                <input className="ef-input" type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} />
              </div>

              <div>
                <label className="ef-label">Warranty Expiry Date</label>
                <input className="ef-input" type="date" name="warrantyExpiryDate" value={form.warrantyExpiryDate} onChange={handleChange} />
              </div>

              <div className="ef-full">
                <label className="ef-label">Description</label>
                <textarea className="ef-input" name="description" placeholder="Optional details about this equipment..." value={form.description} onChange={handleChange} rows={3} style={{ resize: 'vertical' }} />
              </div>
            </div>

            <div className="ef-btn-row">
              <button type="submit" className="ef-btn" disabled={loading}>
                {loading ? 'Saving...' : isEdit ? 'Update Equipment' : 'Add Equipment'}
              </button>
              <button type="button" className="ef-btn-cancel" onClick={() => window.location.href = '/equipment'}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}