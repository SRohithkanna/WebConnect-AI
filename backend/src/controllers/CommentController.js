import CommentService from '../services/CommentService.js';

import { successResponse } from '../utils/apiResponse.js';

const createComment = async (
  req,
  res,
  next
) => {
  try {
    const comment =
      await CommentService.createComment({
        postId: req.params.postId,
        userId: req.user.userId,
        text: req.body.text,
      });

    return successResponse({
      res,
      message: 'Comment created successfully.',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (
  req,
  res,
  next
) => {
  try {
    const comments =
      await CommentService.getComments(
        req.params.postId
      );

    return successResponse({
      res,
      message: 'Comments fetched successfully.',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (
  req,
  res,
  next
) => {
  try {
    await CommentService.deleteComment({
      commentId: req.params.commentId,
      userId: req.user.userId,
    });

    return successResponse({
      res,
      message: 'Comment deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createComment,
  getComments,
  deleteComment,
};