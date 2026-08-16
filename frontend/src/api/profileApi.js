import apiClient from './axios.js';

const getMyProfile = async () => {
  const response = await apiClient.get(
    '/profiles/me'
  );

  return response.data;
};

export default {
  getMyProfile,
};