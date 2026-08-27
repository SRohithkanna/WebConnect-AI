import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';

const getAllPublicProfiles = async (currentUserId) => {
  const users =
    await UserRepository.findAllPublicProfiles(
      currentUserId
    );

  return users;
};

const getPublicProfile = async (userId) => {
  const user =
    await UserRepository.findPublicProfileById(
      userId
    );

  if (!user) {
    const error = new Error(
      'User not found.'
    );

    error.statusCode = StatusCodes.NOT_FOUND;

    throw error;
  }

  return user;
};

export default {
  getAllPublicProfiles,
  getPublicProfile,
};