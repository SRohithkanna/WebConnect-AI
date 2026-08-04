import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
    data: null,
    errors: null,
  });
};

export default notFoundMiddleware;