import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/UserRepository.js';
import SessionRepository from '../repositories/SessionRepository.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
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
const refreshToken = async (token) => {
  const payload = verifyRefreshToken(token);

  const refreshTokenHash = hashToken(token);

  const session = await SessionRepository.findByRefreshTokenHash(
    refreshTokenHash
  );

  if (!session || session.isRevoked) {
    const error = new Error('Invalid refresh token.');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const accessToken = generateAccessToken({
    userId: payload.userId,
  });

  const newRefreshToken = generateRefreshToken({
    userId: payload.userId,
  });

  const newRefreshTokenHash = hashToken(newRefreshToken);

  await SessionRepository.revokeSession(session._id);

  await SessionRepository.create({
    user: payload.userId,
    refreshTokenHash: newRefreshTokenHash,
    deviceName: session.deviceName,
    browser: session.browser,
    operatingSystem: session.operatingSystem,
    ipAddress: session.ipAddress,
    userAgent: session.userAgent,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const logout = async (token) => {
  const refreshTokenHash = hashToken(token);

  const session = await SessionRepository.findByRefreshTokenHash(
    refreshTokenHash
  );

  if (!session) {
    return;
  }

  await SessionRepository.revokeSession(session._id);
};

const logoutAllDevices = async (userId) => {
  await SessionRepository.revokeAllSessions(userId);
};

export default {
  register,
  login,
  refreshToken,
  logout,
  logoutAllDevices,
};