import axiosInstance from './axios';

export const createPost = async (text) => {
  const response = await axiosInstance.post(
    '/posts',
    {
      text,
    }
  );

  return response.data;
};

export const getPosts = async () => {
  const response = await axiosInstance.get(
    '/posts'
  );

  return response.data;
};

export const getPostById = async (postId) => {
  const response = await axiosInstance.get(
    `posts/${postId}`
  );

  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(
    `/posts/${postId}`
  );

  return response.data;
};