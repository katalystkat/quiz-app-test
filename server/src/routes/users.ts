import express from 'express';

import UsersController from '../controllers/users/usersController.js';

const router = express.Router();

router.route('/').post(UsersController.create);

export default router;