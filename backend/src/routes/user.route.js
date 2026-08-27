import express from 'express';

import UserController from '../controllers/UserController.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

/*
 * GET /api/v1/users
 *
 * Get all other users
 */
router.get(
  '/',
  authMiddleware,
  UserController.getAllUsers
);

/*
 * GET /api/v1/users/:userId
 *
 * Get one user's public profile
 */
router.get(
  '/:userId',
  authMiddleware,
  UserController.getUserById
);

export default router;