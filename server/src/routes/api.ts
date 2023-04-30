import express from 'express';
import 'express-async-errors';

import authRoutes from './auth.js';
import usersRoutes from './users.js';
import quizRoutes from './quiz.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/quiz', quizRoutes);
router.route('/home').get((req, res) => res.send('server routes up!'));

export default router;