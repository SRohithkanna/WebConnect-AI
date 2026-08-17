import express from 'express';

import PostController from '../controllers/PostController.js';

import authenticate from '../middlewares/auth.middleware.js';

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

export default router;