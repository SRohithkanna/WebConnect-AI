import PostService from '../services/PostService.js';

import { successResponse } from '../utils/apiResponse.js';

const createPost = async (
  req,
  res,
  next
) => {
  try {
    const post =
      await PostService.createPost({
        userId: req.user.userId,
        text: req.body.text,
      });

    return successResponse({
      res,
      message: 'Post created successfully.',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (
  req,
  res,
  next
) => {
  try {
    const posts =
      await PostService.getAllPosts();

    return successResponse({
      res,
      message: 'Posts fetched successfully.',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (
  req,
  res,
  next
) => {
  try {
    const post =
      await PostService.getPostById(
        req.params.id
      );

    return successResponse({
      res,
      message: 'Post fetched successfully.',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (
  req,
  res,
  next
) => {
  try {
    await PostService.deletePost({
      postId: req.params.id,
      userId: req.user.userId,
    });

    return successResponse({
      res,
      message: 'Post deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
};