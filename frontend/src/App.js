import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/Equipment/EquipmentList';
import EquipmentForm from './pages/Equipment/EquipmentForm';
import EquipmentDetails from './pages/Equipment/EquipmentDetails';
import TeamList from './pages/Teams/TeamList';
import TeamForm from './pages/Teams/TeamForm';
import TeamDetails from './pages/Teams/TeamDetails';
import RequestList from './pages/Requests/RequestList';
import RequestForm from './pages/Requests/RequestForm';
import RequestDetails from './pages/Requests/RequestDetails';
import KanbanBoard from './pages/Requests/KanbanBoard';
import CalendarView from './pages/Requests/CalendarView';
import ReportsPage from './pages/Reports/ReportsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/equipment" element={<EquipmentList />} />
        <Route path="/equipment/new" element={<EquipmentForm />} />
        <Route path="/equipment/edit/:id" element={<EquipmentForm />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/new" element={<TeamForm />} />
        <Route path="/teams/edit/:id" element={<TeamForm />} />
        <Route path="/teams/:id" element={<TeamDetails />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/requests/new" element={<RequestForm />} />
        <Route path="/requests/edit/:id" element={<RequestForm />} />
        <Route path="/requests/:id" element={<RequestDetails />} />
        <Route path="/requests/kanban" element={<KanbanBoard />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
