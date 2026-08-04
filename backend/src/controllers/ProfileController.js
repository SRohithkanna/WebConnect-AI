import ProfileService from '../services/ProfileService.js';

import { successResponse } from '../utils/apiResponse.js';

const getMyProfile = async (req, res, next) => {
  try {
    const profile = await ProfileService.getMyProfile(
      req.user.userId
    );

    return successResponse({
      res,
      message: 'Profile fetched successfully.',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const profile =
      await ProfileService.updateMyProfile(
        req.user.userId,
        req.body
      );

    return successResponse({
      res,
      message: 'Profile updated successfully.',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getMyProfile,
  updateMyProfile,
};