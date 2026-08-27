import ResumeService from '../services/ResumeService.js';

import { successResponse } from '../utils/apiResponse.js';

import ResumeAIService from '../services/ResumeAIService.js';

const uploadResume = async (
  req,
  res,
  next
) => {
  try {
    const resume =
      await ResumeService.uploadResume(
        req.user.userId,
        req.file
      );

    return successResponse({
      res,
      message: 'Resume uploaded successfully.',
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

const getResume = async (
  req,
  res,
  next
) => {
  try {
    const resume =
      await ResumeService.getResume(
        req.user.userId
      );

    return successResponse({
      res,
      message: 'Resume fetched successfully.',
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

const deleteResume = async (
  req,
  res,
  next
) => {
  try {
    await ResumeService.deleteResume(
      req.user.userId
    );

    return successResponse({
      res,
      message: 'Resume deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
const analyzeResume = async (req, res, next) => {
  try {
    const resume =
      await ResumeAIService.analyzeResume(
        req.user.userId
      );

    return successResponse({
      res,
      message: 'Resume analyzed successfully.',
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};


const getResumeAnalysis = async (req, res, next) => {
  try {
    const analysis =
      await ResumeAIService.getResumeAnalysis(
        req.user.userId
      );

    return successResponse({
      res,
      message: 'Resume analysis fetched successfully.',
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  uploadResume,
  getResume,
  deleteResume,
  analyzeResume,
  getResumeAnalysis,
};