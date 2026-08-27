import axiosInstance from './axios';

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append('resume', file);

  const response = await axiosInstance.post(
    '/resume/upload',
    formData
  );

  return response.data;
};

export const getResume = async () => {
  const response = await axiosInstance.get(
    '/resume'
  );

  return response.data;
};

export const deleteResume = async () => {
  const response = await axiosInstance.delete(
    '/resume'
  );

  return response.data;
};

export const analyzeResume = async () => {
  const response = await axiosInstance.post(
    '/resume/analyze'
  );

  return response.data;
};

export const getResumeAnalysis = async () => {
  const response = await axiosInstance.get(
    '/resume/analysis'
  );

  return response.data;
};