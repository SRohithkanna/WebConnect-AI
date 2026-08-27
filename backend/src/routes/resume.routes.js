import express from 'express';

import ResumeController from '../controllers/ResumeController.js';

import authMiddleware from '../middlewares/auth.middleware.js';

import uploadResume from '../middlewares/uploadResume.js';

const router = express.Router();

router.post(
  '/upload',
  authMiddleware,
  uploadResume.single('resume'),
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