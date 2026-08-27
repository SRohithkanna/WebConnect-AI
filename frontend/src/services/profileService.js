import apiClient from '../api/axios.js';

const getMyProfile = async () => {
  const response = await apiClient.get(
    '/profile/me'
  );

  return response.data;
};

const updateMyProfile = async (profileData) => {
  const response = await apiClient.patch(
    '/profile/me',
    profileData
  );

  return response.data;
};

export default {
  getMyProfile,
  updateMyProfile,
};