import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source.js';
import { Quiz } from '../../entities/quiz.js';
import { Question } from '../../entities/question.js';
import { Option } from '../../entities/option.js';
import createHttpError from 'http-errors';
// Need controller to 
// 1) get quiz questions and options 
// get quiz answers

const getQuizData = async (req: Request, res: Response, next: NextFunction) => {
    const { quizId } = req.body
    try {
      // find user in the database
        const quizRepo = AppDataSource.getRepository(Quiz);
        const quiz = await quizRepo.find({ 
            where: { id: quizId },
        });
        if (!quiz) {
        return next(createHttpError(401, 'quiz does not exist'));
         }
        const questionsRepo = AppDataSource.getRepository(Question);
        const questions = await questionsRepo.find({
            where: { quizId: quizId},
        })
        if (!questions) {
            return next(createHttpError(401, 'questions do not exist'));
        }
        const optionsRepo = AppDataSource.getRepository(Option);
        const options = await optionsRepo.find({
            where: { quizId: quizId }
        })
        if (!options){
            return next(createHttpError(401, 'options do not exist'));
        }
        return res.status(200).send({
            quiz,
            questions,
            options
        })
    } catch (error) {
        return next(error);
    }
  }

const getQuizAnswers = async (req: Request, res: Response, next: NextFunction) => {
const { quizId } = req.body
    try {
        const optionsRepo = AppDataSource.getRepository(Option);
        const optionsCorrect = await optionsRepo.find({
            where: { quizId: quizId, isCorrect: true }
        })   
        if (!optionsCorrect){
            return next(createHttpError(401, 'no correct answers'));
        } 
        const answersMap: Record<string, number> = {};
        optionsCorrect.forEach((option) => {
            answersMap[option.questionId] = option.optionIndex
        })
        return res.status(200).send({
            answersMap
        })
    } catch (error) {
        return next(error);
    }
}
export default { getQuizData, getQuizAnswers }