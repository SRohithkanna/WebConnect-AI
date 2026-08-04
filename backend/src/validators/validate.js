import { StatusCodes } from 'http-status-codes';

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = parsed.body;
      req.params = parsed.params ?? req.params;
      req.query = parsed.query ?? req.query;

      next();
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed.',
        errors: error.errors?.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  };
};

export default validate;