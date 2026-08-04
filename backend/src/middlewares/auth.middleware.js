import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import env from '../config/env.js';

const authenticate = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);

    req.user = {
      userId: payload.userId,
    };

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired access token.',
    });
  }
};

export default authenticate;