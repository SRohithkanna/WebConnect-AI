import { StatusCodes } from 'http-status-codes';

import CommentRepository from '../repositories/CommentRepository.js';
import PostRepository from '../repositories/PostRepository.js';

const createComment = async ({
  postId,
  userId,
  text,
}) => {
  const post = await PostRepository.findById(
    postId
  );

  if (!post) {
    const error = new Error('Post not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  const comment = await CommentRepository.create({
    post: postId,
    user: userId,
    text,
  });

  return CommentRepository.findById(comment._id)
    .then((createdComment) =>
      createdComment.populate(
        'user',
        'name username'
      )
    );
};

const getComments = async (postId) => {
  const post = await PostRepository.findById(
    postId
  );

  if (!post) {
    const error = new Error('Post not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  return CommentRepository.findByPost(postId);
};

const deleteComment = async ({
  commentId,
  userId,
}) => {
  const comment =
    await CommentRepository.findById(commentId);

  if (!comment) {
    const error = new Error('Comment not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  if (
    comment.user.toString() !== userId.toString()
  ) {
    const error = new Error(
      'You can only delete your own comment.'
    );

    error.statusCode =
      StatusCodes.FORBIDDEN;

    throw error;
  }

  await CommentRepository.deleteById(
    commentId
  );
};

export default {
  createComment,
  getComments,
  deleteComment,
};