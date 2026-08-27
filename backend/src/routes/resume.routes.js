import express from 'express';

import ResumeController from '../controllers/ResumeController.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/upload',
  authMiddleware,
  ResumeController.uploadResume
);

router.get(
  '/',
  authMiddleware,
  ResumeController.getResume
);

router.delete(
  '/',
  authMiddleware,
  ResumeController.deleteResume
);

router.post(
  '/analyze',
  authMiddleware,
  ResumeController.analyzeResume
);

router.get(
  '/analysis',
  authMiddleware,
  ResumeController.getResumeAnalysis
);

export default router;