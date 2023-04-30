import express from 'express';

import AuthController from '../controllers/auth/authController.js';
import { isAuthenticated, isUnauthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route('./login').post(isUnauthenticated, AuthController.login);
router.route('./logout').post(isAuthenticated, AuthController.logout);
router.route('./authenticated').get(AuthController.authenticated);

export default router;