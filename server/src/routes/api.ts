import express from 'express';
import 'express-async-errors';

import authRoutes from './auth';
import usersRoutes from './users';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

router.route('/home').get((req, res) => res.send('server routes up!'));
