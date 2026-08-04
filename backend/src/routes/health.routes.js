import express from 'express';

import { successResponse } from '../utils/apiResponse.js';

const router = express.Router();

router.get('/', (req, res) => {
  successResponse({
    res,
    message: 'DevConnect AI API is running.',
    data: {
      uptime: process.uptime(),
    },
  });
});

export default router;