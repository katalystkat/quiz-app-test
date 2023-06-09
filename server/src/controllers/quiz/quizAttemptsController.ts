import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source.js';
import { Quiz } from '../../entities/quiz.js';
import { QuizAttempt } from '../../entities/quizAttempt.js';
import { Question } from '../../entities/question.js';
import { Option } from '../../entities/option.js';
import { Participant } from '../../entities/participant.js';

import createHttpError from 'http-errors';

const addQuizAttempt = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { userId, quizId, score } = req.body;
    console.log(req.body);
    console.log(userId)
    if (!userId || typeof userId !== 'string'){
      return next(createHttpError(400, 'Invalid userId'))
    }
    if (!quizId || typeof quizId !== 'string'){
      return next(createHttpError(400, 'Invalid quizId'))
    }
    if (!score || typeof score !== 'number'){
      return next(createHttpError(400, 'Invalid score'))
    }
    try {
      const participantRepo = AppDataSource.getRepository(Participant);
      const participant = await participantRepo.findOne({
        where: { id: userId }
      });
      if (!participant) {
        return next(createHttpError(404, 'Participant not found'));
      }
      const quizRepo = AppDataSource.getRepository(Quiz);
      const quiz = await quizRepo.findOne({
        where: { id: quizId }
      });
      if (!quiz) {
        return next(createHttpError(404, 'Quiz nowhere to be found'));
      }
      // create a new quiz attempt
      const quizAttemptRepo = AppDataSource.getRepository(QuizAttempt);
      const quizAttempt = await new QuizAttempt();
      quizAttempt.user = participant;
      quizAttempt.quiz = quiz;
      quizAttempt.score = score;
      console.log('quizAttempt: ' + quizAttempt);
      const newQuizAttempt = await quizAttemptRepo.save(quizAttempt);
      return res.status(201).send({
        message: 'Quiz attempt added successfully',
        quizAttempt: newQuizAttempt,
      });
    } catch (error) {
      console.log('add new quizattempt error')
      return next(error);
    }
  };

const getQuizAttempts = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.body
    if (!userID || typeof userID !== 'string'){
      return next(createHttpError(400, 'Invalid userId'))
    }
    try {
        const quizAttemptsRepo = AppDataSource.getRepository(QuizAttempt);
        const quizAttempts = await quizAttemptsRepo.find({
            where: { user: { id: userID} },
            relations: ['user']
        });
        if (!quizAttempts) {
        return next(createHttpError(401, 'No Attempt History available for this user'));
         };
        return res.status(200).send({
            quizAttempts: quizAttempts
        });
    } catch (error) {
        return next(error);
    }
  }

  export default { getQuizAttempts, addQuizAttempt }