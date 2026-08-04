import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';
import SessionRepository from '../repositories/SessionRepository.js';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt.js';

import { hashToken } from '../utils/hash.js';

const register = async ({
  name,
  username,
  email,
  password,
  deviceName,
  browser,
  operatingSystem,
  ipAddress,
  userAgent,
}) => {
  const emailExists = await UserRepository.existsByEmail(email);

  if (emailExists) {
    const error = new Error('Email already exists.');
    error.statusCode = StatusCodes.CONFLICT;
    throw error;
  }

  const usernameExists = await UserRepository.existsByUsername(username);

  if (usernameExists) {
    const error = new Error('Username already exists.');
    error.statusCode = StatusCodes.CONFLICT;
    throw error;
  }

  const user = await UserRepository.create({
    name,
    username,
    email,
    password,
  });

  const tokenPayload = {
    userId: user._id,
  };

  const accessToken = generateAccessToken(tokenPayload);

  const refreshToken = generateRefreshToken(tokenPayload);

  const refreshTokenHash = hashToken(refreshToken);

  await SessionRepository.create({
    user: user._id,
    refreshTokenHash,
    deviceName,
    browser,
    operatingSystem,
    ipAddress,
    userAgent,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const login = async ({
  email,
  password,
  deviceName,
  browser,
  operatingSystem,
  ipAddress,
  userAgent,
}) => {
  const user = await UserRepository.findByEmail(email, true);

  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password.');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  await UserRepository.updateLastLogin(user._id);

  const tokenPayload = {
    userId: user._id,
  };

  const accessToken = generateAccessToken(tokenPayload);

  const refreshToken = generateRefreshToken(tokenPayload);

  const refreshTokenHash = hashToken(refreshToken);

  await SessionRepository.create({
    user: user._id,
    refreshTokenHash,
    deviceName,
    browser,
    operatingSystem,
    ipAddress,
    userAgent,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export default {
  register,
  login,
};