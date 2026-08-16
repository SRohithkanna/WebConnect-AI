import apiClient from './axios.js';

const analyzeProfile = async () => {
  const response = await apiClient.post(
    '/ai/profile-analysis'
  );

  return response.data;
};

const getLatestAnalysis = async () => {
  const response = await apiClient.get(
    '/ai/profile-analysis'
  );

  return response.data;
};

export default {
  analyzeProfile,
  getLatestAnalysis,
};