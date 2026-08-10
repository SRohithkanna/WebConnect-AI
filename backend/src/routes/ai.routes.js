import express from 'express';

import AIController from '../controllers/AIController.js';

import authenticate from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/profile-analysis',
  authenticate,
  AIController.analyzeProfile
);

export default router;