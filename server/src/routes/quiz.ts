import { Request, Response, NextFunction } from 'express';
import express from 'express';
const router = express.Router();
import QuizController from '../controllers/quiz/quizController.js';
import QuizAttemptsController from '../controllers/quiz/quizAttemptsController.js';
import { isAuthenticated, Authenticate } from '../middlewares/auth.js'
// POST methods : Write new Attempts
router.route('/newAttempt').post(QuizAttemptsController.addQuizAttempt);


// GET methods : Fetch Quiz, Answers, History
// router.get('/getQuiz', Authenticate, QuizController.getQuizData);
router.get('/getQuiz', isAuthenticated, QuizController.getQuizData);
router.get('/getQuizAnswers', isAuthenticated, QuizController.getQuizAnswers)
router.get('/getQuizAttempts', isAuthenticated, QuizAttemptsController.getQuizAttempts);
router.post('/addQuizAttempts', QuizAttemptsController.addQuizAttempt);
// router.route('/logout').post(isAuthenticated, AuthController.logout);


export default router;