import InterviewService from '../services/InterviewService.js';

import { successResponse } from '../utils/apiResponse.js';


// ---------------------------------------
// Generate interview questions
// ---------------------------------------

const generateInterviewQuestions =
  async (req, res, next) => {
    try {
      const result =
        await InterviewService.generateInterviewQuestions(
          req.user.userId
        );

      return successResponse({
        res,
        message:
          'Interview questions generated successfully.',
        data: result,
      });

    } catch (error) {
      next(error);
    }
  };


// ---------------------------------------
// Get latest saved interview
// ---------------------------------------

const getLatestInterview =
  async (req, res, next) => {
    try {
      const result =
        await InterviewService.getLatestInterview(
          req.user.userId
        );

      return successResponse({
        res,
        message:
          'Interview questions fetched successfully.',
        data: result,
      });

    } catch (error) {
      next(error);
    }
  };


export default {
  generateInterviewQuestions,
  getLatestInterview,
};