import axiosInstance from './axios.js';


// ---------------------------------------
// Generate interview questions
// ---------------------------------------

export const generateInterviewQuestions =
  async () => {

    const response =
      await axiosInstance.post(
        '/interview/generate'
      );

    return response.data;
  };


// ---------------------------------------
// Get latest saved interview
// ---------------------------------------

export const getLatestInterview =
  async () => {

    const response =
      await axiosInstance.get(
        '/interview'
      );

    return response.data;
  };