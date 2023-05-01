import express from 'express';
import { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth/authController.js';
import { isAuthenticated, isUnauthenticated, Authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/',  (req: Request, res : Response, next : NextFunction) => {
    console.log('auth')
  });
router.route('/login').post(isUnauthenticated, AuthController.login);
router.route('/logout').post(isAuthenticated, AuthController.logout);
router.route('/authenticated').get(AuthController.authenticated);

export default router;


// router.get('/',  (req: Request, res : Response, next : NextFunction) => {
//     console.log('quizRoute')
//   });
