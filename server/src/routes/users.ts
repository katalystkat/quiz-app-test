import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UsersController from '../controllers/users/usersController.js';

const router = express.Router();

// POST Methods
// Registers new user in database, returns userID 
router.post('/register', UsersController.create);

// Future ADDONs: 
// router.get('/generateOTP', UsersController.generateOTP) //generate OTP
// router.get('/verifyOTP', UsersController.verifyOTP) // verify generated OTP
// router.get('/createResetSession', UsersController.createResetSession); //reset variables

export default router;

