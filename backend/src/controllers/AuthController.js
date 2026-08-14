import { StatusCodes } from 'http-status-codes';

import AuthService from '../services/AuthService.js';
import {
  REFRESH_COOKIE_NAME,
  refreshCookieOptions,
} from '../utils/cookies.js';

import { successResponse } from '../utils/apiResponse.js';

const register = async (req, res) => {
  const result = await AuthService.register({
    ...req.body,
    deviceName: req.headers['sec-ch-ua'] || 'Unknown Device',
    browser: req.headers['user-agent'] || 'Unknown Browser',
    operatingSystem: 'Unknown',
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  });

  res.cookie(
    REFRESH_COOKIE_NAME,
    result.refreshToken,
    refreshCookieOptions
  );

  return successResponse({
    res,
    statusCode: StatusCodes.CREATED,
    message: 'Registration successful.',
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
};

const login = async (req, res) => {
  const result = await AuthService.login({
    ...req.body,
    deviceName: req.headers['sec-ch-ua'] || 'Unknown Device',
    browser: req.headers['user-agent'] || 'Unknown Browser',
    operatingSystem: 'Unknown',
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  });

  res.cookie(
    REFRESH_COOKIE_NAME,
    result.refreshToken,
    refreshCookieOptions
  );

  return successResponse({
    res,
    message: 'Login successful.',
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
};

const refresh = async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE_NAME];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Refresh token required.',
      data: null,
      errors: null,
    });
  }

  const result = await AuthService.refreshToken(token);

  res.cookie(
    REFRESH_COOKIE_NAME,
    result.refreshToken,
    refreshCookieOptions
  );

  return successResponse({
    res,
    message: 'Token refreshed successfully.',
    data: {
      accessToken: result.accessToken,
    },
  });
};

const logout = async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE_NAME];

  await AuthService.logout(token);

  res.clearCookie(
    REFRESH_COOKIE_NAME,
    refreshCookieOptions
  );

  return successResponse({
    res,
    message: 'Logout successful.',
  });
};

const logoutAllDevices = async (req, res) => {
  await AuthService.logoutAllDevices(req.user.userId);

  res.clearCookie(
    REFRESH_COOKIE_NAME,
    refreshCookieOptions
  );

  return successResponse({
    res,
    message: 'Logged out from all devices.',
  });
};

export default {
  register,
  login,
  refresh,
  logout,
  logoutAllDevices,
};