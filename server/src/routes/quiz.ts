import { Request, Response, NextFunction } from 'express';
import express from 'express';
const router = express.Router();
import QuizController from '../controllers/quiz/quizController.js';
import QuizAttemptsController from '../controllers/quiz/quizAttemptsController.js';
import { Authenticate } from '../middlewares/auth.js'
// POST methods : Write new Attempts
router.route('/newAttempt').post(QuizAttemptsController.addQuizAttempt);


// GET methods : Fetch Quiz, Answers, History
router.get('/getQuiz', Authenticate, QuizController.getQuizData);
router.get('/getQuizAnswers', QuizController.getQuizAnswers)
router.get('/getQuizAttempts', Authenticate, QuizAttemptsController.getQuizAttempts);
// router.get('/getQuizAttempts').get(QuizAttemptsController.getQuizAttempts);


export default router;