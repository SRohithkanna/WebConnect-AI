import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';

const getMyProfile = async (userId) => {
  const user = await UserRepository.findProfileById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  return user;
};

const updateMyProfile = async (userId, payload) => {
  const user = await UserRepository.findProfileById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  const updatedUser = await UserRepository.updateProfile(
    userId,
    payload
  );

  return updatedUser;
};

export default {
  getMyProfile,
  updateMyProfile,
};