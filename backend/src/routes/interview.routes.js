import express from 'express';

import InterviewController from '../controllers/InterviewController.js';

import authenticate from '../middlewares/auth.middleware.js';


const router = express.Router();


// ---------------------------------------
// Generate interview questions
// ---------------------------------------

router.post(
  '/generate',
  authenticate,
  InterviewController.generateInterviewQuestions
);


// ---------------------------------------
// Get latest saved interview
// ---------------------------------------

router.get(
  '/',
  authenticate,
  InterviewController.getLatestInterview
);


export default router;