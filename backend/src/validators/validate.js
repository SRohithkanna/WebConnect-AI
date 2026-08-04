import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      // Only replace req.body
      req.body = parsed.body;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed.',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
};

export default validate;