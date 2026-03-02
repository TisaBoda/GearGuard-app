import authService from './authService';

const API_URL = 'http://localhost:5000/api/equipment';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authService.getToken()}`
});

const getAllEquipment = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}?${query}`, { headers: getHeaders() });
  return res.json();
};

const getEquipment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { headers: getHeaders() });
  return res.json();
};

const createEquipment = async (data) => {
  const res = await fetch(API_URL, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
  return res.json();
};

const updateEquipment = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(data) });
  return res.json();
};

const deleteEquipment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: getHeaders() });
  return res.json();
};

const equipmentService = { getAllEquipment, getEquipment, createEquipment, updateEquipment, deleteEquipment };
export default equipmentService;