import apiClient from './axios.js';

export const getUsers = async () => {
  const response = await apiClient.get(
    '/users'
  );

  return response.data;
};

export const getUserById = async (userId) => {
  const response = await apiClient.get(
    `/users/${userId}`
  );

  return response.data;
};