import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';

const calculateProfileCompletion = (user) => {
  const fields = [
    user.avatar,
    user.headline,
    user.bio,
    user.location,
    user.company,
    user.currentPosition,
    user.portfolio,
    user.github,
    user.linkedin,
    user.twitter,
  ];

  let completed = fields.filter(Boolean).length;

  if (user.skills?.length) completed++;
  if (user.interests?.length) completed++;

  return Math.round((completed / 12) * 100);
};

const getMyProfile = async (userId) => {
  const user = await UserRepository.findProfileById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  return {
    ...user.toJSON(),
    profileCompletion: calculateProfileCompletion(user),
  };
};

const updateMyProfile = async (userId, payload) => {
  const user = await UserRepository.updateProfile(
    userId,
    payload
  );

  return {
    ...user.toJSON(),
    profileCompletion: calculateProfileCompletion(user),
  };
};

const getPublicProfile = async (username) => {
  const user = await UserRepository.findByUsername(username);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  return {
    ...user.toJSON(),
    profileCompletion: calculateProfileCompletion(user),
  };
};

export default {
  getMyProfile,
  updateMyProfile,
  getPublicProfile,
};