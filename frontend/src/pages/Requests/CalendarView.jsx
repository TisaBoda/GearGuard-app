import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestService from '../../services/requestService';

export default function CalendarView() {
  const [requests, setRequests] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await requestService.getCalendarRequests();
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getRequestsForDay = (day) => {
    return requests.filter((r) => {
      if (!r.scheduledDate) return false;
      const d = new Date(r.scheduledDate);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  };

  const statusColor = (s) => ({
    'New': '#3b82f6', 'Assigned': '#f0a500',
    'In Progress': '#8b5cf6', 'Repaired': '#10b981', 'Scrapped': '#ef4444',
  }[s] || '#555');

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .cv-root { min-height: 100vh; background: #0d0d0d; font-family: 'Barlow', sans-serif; padding: 40px; }
        .cv-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; border-bottom: 1px solid #1e1e1e; padding-bottom: 24px; }
        .cv-title { font-family: 'Barlow Condensed', sans-serif; font-size: 42px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: #fff; }
        .cv-title span { color: #f0a500; }
        .cv-nav { display: flex; align-items: center; gap: 16px; }
        .cv-nav-btn { background: #1a1a1a; border: 1px solid #2a2a2a; color: #fff; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; width: 36px; height: 36px; cursor: pointer; transition: border-color 0.2s; }
        .cv-nav-btn:hover { border-color: #f0a500; color: #f0a500; }
        .cv-month { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; color: #fff; letter-spacing: 2px; text-transform: uppercase; min-width: 220px; text-align: center; }
        .cv-days-header { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 2px; }
        .cv-day-name { text-align: center; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #555; padding: 10px 0; }
        .cv-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
        .cv-cell { background: #111; border: 1px solid #1a1a1a; min-height: 110px; padding: 8px; transition: border-color 0.2s; }
        .cv-cell:hover { border-color: #2a2a2a; }
        .cv-cell.empty { background: #0a0a0a; }
        .cv-cell.today { border-color: #f0a500; }
        .cv-day-num { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: #444; margin-bottom: 6px; }
        .cv-cell.today .cv-day-num { color: #f0a500; }
        .cv-event { font-size: 10px; font-weight: 600; padding: 3px 6px; margin-bottom: 3px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border-left: 3px solid var(--ec); background: rgba(255,255,255,0.04); color: #ccc; transition: background 0.2s; }
        .cv-event:hover { background: rgba(255,255,255,0.08); }
        .cv-more { font-size: 10px; color: #555; margin-top: 2px; }
      `}</style>

      <div className="cv-root">
        <div className="cv-header">
          <h1 className="cv-title">📅 Calendar <span>View</span></h1>
          <div className="cv-nav">
            <button className="cv-nav-btn" onClick={prevMonth}>‹</button>
            <div className="cv-month">{monthName}</div>
            <button className="cv-nav-btn" onClick={nextMonth}>›</button>
          </div>
        </div>

        <div className="cv-days-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="cv-day-name">{d}</div>
          ))}
        </div>

        <div className="cv-grid">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} className="cv-cell empty" />;
            const dayRequests = getRequestsForDay(day);
            return (
              <div key={day} className={`cv-cell ${isToday(day) ? 'today' : ''}`}>
                <div className="cv-day-num">{day}</div>
                {dayRequests.slice(0, 3).map((r) => (
                  <div
                    key={r._id}
                    className="cv-event"
                    style={{ '--ec': statusColor(r.status) }}
                    onClick={() => navigate(`/requests/${r._id}`)}
                    title={r.subject}
                  >
                    {r.subject}
                  </div>
                ))}
                {dayRequests.length > 3 && (
                  <div className="cv-more">+{dayRequests.length - 3} more</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
