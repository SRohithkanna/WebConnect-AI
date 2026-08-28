import env from '../config/env.js';

export const REFRESH_COOKIE_NAME =
  'refreshToken';

export const refreshCookieOptions = {
  httpOnly: true,

  secure:
    env.NODE_ENV === 'production',

  sameSite:
    env.NODE_ENV === 'production'
      ? 'none'
      : 'strict',

  maxAge:
    7 * 24 * 60 * 60 * 1000,

  path: '/',
};