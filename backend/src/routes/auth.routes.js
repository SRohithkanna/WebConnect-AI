import express from 'express';

import AuthController from '../controllers/AuthController.js';

import validate from '../validators/validate.js';

import {
  registerSchema,
  loginSchema,
} from '../schemas/auth.schema.js';

const router = express.Router();

router.post(
  '/register',
  validate(registerSchema),
  AuthController.register
);

router.post(
  '/login',
  validate(loginSchema),
  AuthController.login
);

router.post(
  '/refresh',
  AuthController.refresh
);

router.post(
  '/logout',
  AuthController.logout
);

router.post(
  '/logout-all',
  AuthController.logoutAllDevices
);

export default router;