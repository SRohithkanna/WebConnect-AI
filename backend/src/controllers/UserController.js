import UserService from '../services/UserService.js';

import {
  successResponse,
} from '../utils/apiResponse.js';

const getAllUsers = async (
  req,
  res,
  next
) => {
  try {
    const users =
      await UserService.getAllPublicProfiles(
        req.user.userId
      );

    return successResponse({
      res,
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await UserService.getPublicProfile(
        req.params.userId
      );

    return successResponse({
      res,
      message: 'User profile fetched successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
};