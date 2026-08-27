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

export const getComments = async (postId) => {
  const response = await axiosInstance.get(
    `/posts/${postId}/comments`
  );

  return response.data;
};

export const createComment = async (
  postId,
  text
) => {
  const response = await axiosInstance.post(
    `/posts/${postId}/comments`,
    {
      text,
    }
  );

  return response.data;
};

export const deleteComment = async (
  postId,
  commentId
) => {
  const response = await axiosInstance.delete(
    `/posts/${postId}/comments/${commentId}`
  );

  return response.data;
};