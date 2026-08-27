import apiClient from '../api/axios.js';
import authApi from '../api/authApi.js';

const register = async (userData) => {
  const response = await authApi.post(
    '/auth/register',
    userData
  );

  return response.data;
};

const login = async (credentials) => {
  const response = await authApi.post(
    '/auth/login',
    credentials
  );

  return response.data;
};

const refreshAccessToken = async () => {
  const response = await authApi.post(
    '/auth/refresh'
  );

  return response.data;
};

const logout = async () => {
  const response = await authApi.post(
    '/auth/logout'
  );

  return response.data;
};

const logoutAllDevices = async () => {
  const response = await authApi.post(
    '/auth/logout-all'
  );

  return response.data;
};

const getCurrentUser = async () => {
  const response = await apiClient.get(
    '/profile/me'
  );

  return response.data;
};

export default {
  register,
  login,
  refreshAccessToken,
  logout,
  logoutAllDevices,
  getCurrentUser,
};