import express from 'express';

import ProfileController from '../controllers/ProfileController.js';

import authenticate from '../middlewares/auth.middleware.js';

import validate from '../validators/validate.js';

import { updateProfileSchema } from '../schemas/profile.schema.js';

const router = express.Router();

router.get(
  '/me',
  authenticate,
  ProfileController.getMyProfile
);

router.patch(
  '/me',
  authenticate,
  validate(updateProfileSchema),
  ProfileController.updateMyProfile
);

export default router;