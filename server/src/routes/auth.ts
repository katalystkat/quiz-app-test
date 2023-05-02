import express from 'express';
import { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth/authController.js';
import { isAuthenticated, isUnauthenticated, Authenticate } from '../middlewares/auth.js';

const router = express.Router();

// POST: Login user / Logout of Session 
router.route('/login').post(isUnauthenticated, AuthController.login);
router.route('/logout').post(isAuthenticated, AuthController.logout);

export default router;