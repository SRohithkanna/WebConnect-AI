import AIProfileService from '../services/AIProfileService.js';

import { successResponse } from '../utils/apiResponse.js';

const analyzeProfile = async (req, res, next) => {
  try {
    const analysis = await AIProfileService.analyzeProfile(
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

export default {
  analyzeProfile,
};