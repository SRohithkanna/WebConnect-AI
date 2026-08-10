import AIProfileService from '../services/AIProfileService.js';

import { successResponse } from '../utils/apiResponse.js';

const analyzeProfile = async (req, res, next) => {
  try {
    const analysis =
      await AIProfileService.analyzeProfile(
        req.user.userId
      );

    return successResponse({
      res,
      message: 'Profile analyzed successfully.',
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};

const getLatestAnalysis = async (req, res, next) => {
  try {
    const analysis =
      await AIProfileService.getLatestAnalysis(
        req.user.userId
      );

    return successResponse({
      res,
      message: 'Latest profile analysis fetched successfully.',
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};

const getAnalysisHistory = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result =
      await AIProfileService.getAnalysisHistory(
        req.user.userId,
        page,
        limit
      );

    return successResponse({
      res,
      message: 'Profile analysis history fetched successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  analyzeProfile,
  getLatestAnalysis,
  getAnalysisHistory,
};