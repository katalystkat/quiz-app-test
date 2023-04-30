import { getRepository } from 'typeorm';
import { Quiz } from '../entities/quiz.js';
import { AppDataSource } from '../data-source.js';

const quizRepository = AppDataSource.getRepository(Quiz);

const quizzes: Partial<Quiz>[] = [
  {
    name: 'Kiwis Quiz',
  },
  {
    name: 'Space Quiz',
  },
  {
    name: 'Math Quiz',
  },
];

export const seedQuizData = async () => {
  for (const quiz of quizzes) {
    const newQuiz = quizRepository.create(quiz);
    await quizRepository.save(newQuiz);
  }
};
