import { useState, useEffect } from 'react';
import equipmentService from '../../services/equipmentService';

const CATEGORIES = ['All', 'Computer', 'Vehicle', 'Machine', 'Office Equipment', 'Other'];
const STATUSES = ['All', 'Active', 'Under Maintenance', 'Scrapped'];

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    fetchEquipment();
  }, [category, status]);

  const fetchEquipment = async () => {
    setLoading(true);
    const filters = {};
    if (category !== 'All') filters.category = category;
    if (status !== 'All') filters.status = status;
    const data = await equipmentService.getAllEquipment(filters);
    setEquipment(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this equipment?')) return;
    await equipmentService.deleteEquipment(id);
    fetchEquipment();
  };

  const filtered = equipment.filter(e =>
    e.equipmentName?.toLowerCase().includes(search.toLowerCase()) ||
    e.serialNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s) => {
    if (s === 'Active') return '#28a745';
    if (s === 'Under Maintenance') return '#f0a500';
    return '#dc3545';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .el-root { min-height: 100vh; background: #0d0d0d; color: #fff; font-family: 'Barlow', sans-serif; padding: 32px; }
        .el-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
        .el-title { font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
        .el-title span { color: #f0a500; }
        .el-btn { background: #f0a500; color: #000; border: none; font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 12px 24px; cursor: pointer; transition: background 0.2s; }
        .el-btn:hover { background: #ffd166; }
        .el-filters { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .el-search { flex: 1; min-width: 200px; background: #1a1a1a; border: 1px solid #2a2a2a; border-bottom: 2px solid #333; color: #fff; font-family: 'Barlow', sans-serif; font-size: 14px; padding: 10px 16px; outline: none; }
        .el-search:focus { border-color: #f0a500; }
        .el-select { background: #1a1a1a; border: 1px solid #2a2a2a; border-bottom: 2px solid #333; color: #fff; font-family: 'Barlow', sans-serif; font-size: 14px; padding: 10px 16px; outline: none; cursor: pointer; }
        .el-select:focus { border-color: #f0a500; }
        .el-table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #1a1a1a; color: #888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 12px 16px; text-align: left; border-bottom: 2px solid #222; }
        td { padding: 14px 16px; border-bottom: 1px solid #1a1a1a; font-size: 14px; color: #ccc; }
        tr:hover td { background: #141414; }
        .el-badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
        .el-action { background: none; border: 1px solid #333; color: #888; padding: 6px 12px; font-size: 12px; cursor: pointer; margin-right: 6px; font-family: 'Barlow', sans-serif; transition: all 0.2s; }
        .el-action:hover { border-color: #f0a500; color: #f0a500; }
        .el-action.del:hover { border-color: #dc3545; color: #dc3545; }
        .el-empty { text-align: center; padding: 60px; color: #444; font-size: 16px; }
        .el-loading { text-align: center; padding: 60px; color: #555; }
      `}</style>

      <div className="el-root">
        <div className="el-header">
          <div className="el-title">Equipment <span>List</span></div>
          <button className="el-btn" onClick={() => window.location.href = '/equipment/new'}>
            + Add Equipment
          </button>
        </div>

        <div className="el-filters">
          <input className="el-search" placeholder="Search by name or serial number..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="el-select" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="el-select" value={status} onChange={e => setStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="el-table-wrap">
          {loading ? (
            <div className="el-loading">Loading equipment...</div>
          ) : filtered.length === 0 ? (
            <div className="el-empty">No equipment found. Add your first one!</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Serial No.</th>
                  <th>Category</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(eq => (
                  <tr key={eq._id}>
                    <td style={{ color: '#fff', fontWeight: 500 }}>{eq.equipmentName}</td>
                    <td style={{ color: '#666', fontFamily: 'monospace' }}>{eq.serialNumber}</td>
                    <td>{eq.category}</td>
                    <td>{eq.department}</td>
                    <td>{eq.location || '—'}</td>
                    <td>
                      <span className="el-badge" style={{ color: statusColor(eq.status), border: `1px solid ${statusColor(eq.status)}` }}>
                        {eq.status}
                      </span>
                    </td>
                    <td>
                      <button className="el-action" onClick={() => window.location.href = `/equipment/${eq._id}`}>View</button>
                      <button className="el-action" onClick={() => window.location.href = `/equipment/edit/${eq._id}`}>Edit</button>
                      <button className="el-action del" onClick={() => handleDelete(eq._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}