import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UsersController from '../controllers/users/usersController.js';

const router = express.Router();

// POST Methods
// Registers new user in database, returns userID 
router.route('/register').post(UsersController.create);
// router.route('/registerMail').post(); // Sends Email 
router.route('/authenticate').post((req, res) => res.end()); // authenticates user
router.route('/login').post(UsersController.login); // login in app

// Get Methods
router.route('/generateOTP').get(UsersController.generateOTP) //generate OTP
router.route('/verifyOTP').get(UsersController.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(UsersController.createResetSession); //reset variables

export default router;

