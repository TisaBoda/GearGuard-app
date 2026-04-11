import { useEffect, useState } from 'react';
import requestService from '../../services/requestService';

export default function CalendarView() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await requestService.getAllRequests();
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d0d',
      color: 'white',
      padding: '30px'
    }}>
      <h1>📅 Calendar View</h1>

      {requests.length === 0 ? (
        <p>No scheduled requests</p>
      ) : (
        requests.map((r) => (
          <div key={r._id} style={{
            background: '#111',
            border: '1px solid #1e1e1e',
            padding: '15px',
            marginBottom: '10px'
          }}>
            <h3>{r.subject}</h3>
            <p>Date: {r.scheduledDate || 'Not Scheduled'}</p>
            <p>Status: {r.status}</p>
          </div>
        ))
      )}
    </div>
  );
}