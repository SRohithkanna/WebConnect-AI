import apiClient from "./axios.js";

const getMyProfile = async () => {
  const response = await apiClient.get("/profile/me");

  return response.data;
};

const updateMyProfile = async (profileData) => {
  const response = await apiClient.patch(
    "/profile/me",
    profileData
  );

  return response.data;
};

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
  getMyProfile,
  updateMyProfile,
  getAllDevelopers,
  getPublicProfile,
};