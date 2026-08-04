import { StatusCodes } from 'http-status-codes';

import logger from '../config/logger.js';

const errorMiddleware = (err, req, res, next) => {
  logger.error(
    {
      err,
      method: req.method,
      path: req.originalUrl,
    },
    'Unhandled application error'
  );

  const statusCode =
    err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: null,
    errors: err.errors || null,
  });
};

export default errorMiddleware;