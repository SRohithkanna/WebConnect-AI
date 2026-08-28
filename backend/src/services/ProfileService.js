import { StatusCodes } from "http-status-codes";

import UserRepository from "../repositories/UserRepository.js";

const calculateProfileCompletion = (user) => {
  let completed = 0;

  if (user.headline?.trim()) {
    completed++;
  }

  if (user.bio?.trim()) {
    completed++;
  }

  if (user.location?.trim()) {
    completed++;
  }

  if (user.currentPosition?.trim()) {
    completed++;
  }

  if (
    user.yearsOfExperience !== undefined &&
    user.yearsOfExperience !== null
  ) {
    completed++;
  }

  if (user.skills?.length > 0) {
    completed++;
  }

  if (user.interests?.length > 0) {
    completed++;
  }

  if (user.linkedin?.trim()) {
    completed++;
  }

  return Math.round((completed / 8) * 100);
};

const getMyProfile = async (userId) => {
  const user =
    await UserRepository.findProfileById(userId);

  if (!user) {
    const error = new Error(
      "User not found."
    );

    error.statusCode =
      StatusCodes.NOT_FOUND;

    throw error;
  }

  return {
    ...user.toJSON(),
    profileCompletion:
      calculateProfileCompletion(user),
  };
};

const updateMyProfile = async (
  userId,
  payload
) => {
  const user =
    await UserRepository.updateProfile(
      userId,
      payload
    );

  return {
    ...user.toJSON(),
    profileCompletion:
      calculateProfileCompletion(user),
  };
};

const getAllDevelopers = async (
  currentUserId
) => {
  const users =
    await UserRepository.findAllDevelopers(
      currentUserId
    );

  return users;
};

const getPublicProfile = async (
  username
) => {
  const user =
    await UserRepository.findByUsername(
      username
    );

  if (!user) {
    const error = new Error(
      "User not found."
    );

    error.statusCode =
      StatusCodes.NOT_FOUND;

    throw error;
  }

  return {
    ...user.toJSON(),
    profileCompletion:
      calculateProfileCompletion(user),
  };
};

export default {
  getMyProfile,
  updateMyProfile,
  getPublicProfile,
  getAllDevelopers,
};