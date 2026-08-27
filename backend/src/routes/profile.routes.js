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

// Get all developers
router.get(
  '/',
  authenticate,
  ProfileController.getAllDevelopers
);

// Get one public profile
router.get(
  '/:username',
  ProfileController.getPublicProfile
);

export default router;