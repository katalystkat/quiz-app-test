import express from 'express';
import { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth/authController.js';
import { isAuthenticated, isUnauthenticated, Authenticate } from '../middlewares/auth.js';

const router = express.Router();

// POST: Login user / Logout of Session 
router.post('/login', isUnauthenticated, AuthController.login);
router.post('/logout', isAuthenticated, AuthController.logout);

export default router;