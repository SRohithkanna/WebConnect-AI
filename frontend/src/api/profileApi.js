import apiClient from "./axios.js";

const getAllDevelopers = async () => {
  const response = await apiClient.get("/profile");

  return response.data;
};

const getPublicProfile = async (username) => {
  const response = await apiClient.get(
    `/profile/${username}`
  );

  return response.data;
};

export {
  getAllDevelopers,
  getPublicProfile,
};