import { StatusCodes } from 'http-status-codes';

import PostRepository from '../repositories/PostRepository.js';

const createPost = async ({
  userId,
  text,
}) => {
  const post =
    await PostRepository.create({
      user: userId,
      text,
    });

  return PostRepository.findById(
    post._id
  );
};

const getAllPosts = async () => {
  return PostRepository.findAll();
};

const getPostById = async (postId) => {
  const post =
    await PostRepository.findById(
      postId
    );

  if (!post) {
    const error = new Error(
      'Post not found.'
    );

    error.statusCode =
      StatusCodes.NOT_FOUND;

    throw error;
  }

  return post;
};

const deletePost = async ({
  postId,
  userId,
}) => {
  const post =
    await PostRepository.findById(
      postId
    );

  if (!post) {
    const error = new Error(
      'Post not found.'
    );

    error.statusCode =
      StatusCodes.NOT_FOUND;

    throw error;
  }

  if (
    post.user._id.toString() !==
    userId.toString()
  ) {
    const error = new Error(
      'You are not allowed to delete this post.'
    );

    error.statusCode =
      StatusCodes.FORBIDDEN;

    throw error;
  }

  await PostRepository.deleteById(
    postId
  );
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
};