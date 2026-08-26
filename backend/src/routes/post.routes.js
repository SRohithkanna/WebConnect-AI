import express from 'express';

import PostController from '../controllers/PostController.js';

import authenticate from '../middlewares/auth.middleware.js';

import CommentController from '../controllers/CommentController.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  PostController.createPost
);

router.get(
  '/',
  authenticate,
  PostController.getAllPosts
);

router.get(
  '/:id',
  authenticate,
  PostController.getPostById
);

router.delete(
  '/:id',
  authenticate,
  PostController.deletePost
);

router.post(
  '/:postId/comments',
  authenticate,
  CommentController.createComment
);

router.get(
  '/:postId/comments',
  authenticate,
  CommentController.getComments
);

router.delete(
  '/:postId/comments/:commentId',
  authenticate,
  CommentController.deleteComment
);

export default router;