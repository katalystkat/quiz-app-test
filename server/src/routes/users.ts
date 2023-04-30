import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UsersController from '../controllers/users/usersController.js';

const router = express.Router();
// should rename this as register route
// userse controller is registering new users , returns user ID;
router.route('/').post(UsersController.create);
// works correctly 


// POST Methods
router.route('/register').post((req, res) => {
    console.log('in register route');
    res.json('register route')
});
// Get Methods
router.get('/',  (req: Request, res : Response, next : NextFunction) => {
    console.log('register get')
});

export default router;