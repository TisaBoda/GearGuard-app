// authService.js
// Handles all API calls related to authentication
// TODO: Make sure your backend is running on port 5000

const API_URL = 'http://localhost:5000/api/auth';

// ─── Helper: get token from localStorage ───────────────────────────────────
const getToken = () => localStorage.getItem('token');

// ─── Helper: save token + user to localStorage ─────────────────────────────
const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// ─── Helper: clear auth data ───────────────────────────────────────────────
const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ─── REGISTER ──────────────────────────────────────────────────────────────
// POST /api/auth/register
const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Save token and user if returned on register
    if (data.token) {
      saveAuth(data.token, data.user);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// ─── LOGIN ─────────────────────────────────────────────────────────────────
// POST /api/auth/login
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save token and user to localStorage
    saveAuth(data.token, data.user);

    return data;
  } catch (error) {
    throw error;
  }
};

// ─── LOGOUT ────────────────────────────────────────────────────────────────
const logout = () => {
  clearAuth();
  window.location.href = '/login';
};

// ─── GET CURRENT USER ──────────────────────────────────────────────────────
// GET /api/auth/me  (requires token)
const getCurrentUser = async () => {
  try {
    const token = getToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      clearAuth(); // token expired or invalid
      return null;
    }

    return data.user;
  } catch (error) {
    clearAuth();
    return null;
  }
};

// ─── CHECK IF LOGGED IN ────────────────────────────────────────────────────
const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;

  // Check if token is expired (JWT has 3 parts separated by dots)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      clearAuth();
      return false;
    }
    return true;
  } catch {
    clearAuth();
    return false;
  }
};

// ─── GET STORED USER (no API call) ─────────────────────────────────────────
const getStoredUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// ─── EXPORT ────────────────────────────────────────────────────────────────
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  getStoredUser,
  getToken,
};

export default authService;