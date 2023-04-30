import { Router } from 'express';
import 'express-async-errors';

import authRoutes from './auth.js';
import usersRoutes from './users.js';
import quizRoutes from './quiz.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/quiz', quizRoutes);
router.route('/').get((req, res) => res.send('server routes up!'));

export default router;