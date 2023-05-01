import { Request, Response, NextFunction } from 'express';
import express from 'express';
const router = express.Router();

// POST methods
// need new controller actions to log new results into quizAttempts 
router.route('/newAttempt').post();
// GET methods
router.get('/',  (req: Request, res : Response, next : NextFunction) => {
  console.log('quizRoute')
});



export default router;