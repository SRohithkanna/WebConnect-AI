import express from 'express';

import ResumeController from '../controllers/ResumeController.js';

import authenticate from '../middlewares/auth.middleware.js';

import uploadResume from '../middlewares/uploadResume.js';

const router = express.Router();

router.use(authenticate);

router.post(
  '/',
  uploadResume.single('resume'),
  ResumeController.uploadResume
);

router.get(
  '/',
  ResumeController.getResume
);

router.delete(
  '/',
  ResumeController.deleteResume
);

export default router;