import { Request, Response, NextFunction } from 'express';
import express from 'express';
const router = express.Router();

router.get('/',  (req: Request, res : Response, next : NextFunction) => {
  console.log('quizRoute')
});

export default router;