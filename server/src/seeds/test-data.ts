// seedData.ts
import { getRepository } from 'typeorm';
import { Quiz } from '../entities/quiz.js';
import { Question } from '../entities/question.js';
import { Option } from '../entities/option.js';
import { AppDataSource } from '../data-source.js';

const quizRepository = AppDataSource.getRepository(Quiz);
const questionRepository = AppDataSource.getRepository(Question);
const optionRepository = AppDataSource.getRepository(Option);

export const seedData = async () => {
  // Seed quiz data
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
  for (const quiz of quizzes) {
    const newQuiz = quizRepository.create(quiz);
    await quizRepository.save(newQuiz);
  }

  // Seed question data
  const questions: Partial<Question>[] = [
    { text: 'What is the scientific name for the kiwi bird?', quizId: "1" },
    { text: 'How long does it take for a kiwi egg to hatch?', quizId: "1" },
    { text: 'What is the largest species of kiwi?', quizId: "1" },
    { text: 'What is the smallest species of kiwi?', quizId: "1" },
    { text: 'How many species of kiwi are there?', quizId: "1" },
  ];
  for (const question of questions) {
    const newQuestion = questionRepository.create(question);
    await questionRepository.save(newQuestion);
  }

  // Seed option data
const options: Partial<Option>[] = [
    {
      text: 'Apteryx australis',
      isCorrect: false,
      questionId: "1",
      optionIndex: 0,
    },
    {
      text: 'Apteryx owenii',
      isCorrect: true,
      questionId: "1",
      optionIndex: 1,
    },
    {
      text: 'Apteryx mantelli',
      isCorrect: false,
      questionId: "1",
      optionIndex: 2,
    },
    {
      text: 'Apteryx haastii',
      isCorrect: false,
      questionId: "1",
      optionIndex: 3,
    },
    {
      text: '78 days',
      isCorrect: false,
      questionId: "2",
      optionIndex: 0,
    },
    {
      text: '84 days',
      isCorrect: true,
      questionId: "2",
      optionIndex: 1,
    },
    {
      text: '90 days',
      isCorrect: false,
      questionId: "2",
      optionIndex: 2,
    },
    {
      text: '100 days',
      isCorrect: false,
      questionId: "2",
      optionIndex: 3,
    },
    {
      text: 'Great spotted kiwi',
      isCorrect: false,
      questionId: "3",
      optionIndex: 0,
    },
    {
      text: 'Brown kiwi',
      isCorrect: false,
      questionId: "3",
      optionIndex: 1,
    },
    {
      text: 'Little spotted kiwi',
      isCorrect: true,
      questionId: "3",
      optionIndex: 2,
    },
    {
      text: 'Rowi',
      isCorrect: false,
      questionId: "3",
      optionIndex: 3,
    },
    {
      text: 'Rowi',
      isCorrect: false,
      questionId: "4",
      optionIndex: 0,
    },
    {
      text: 'Great spotted kiwi',
      isCorrect: false,
      questionId: "4",
      optionIndex: 1,
    },
    {
      text: 'Little spotted kiwi',
      isCorrect: true,
      questionId: "4",
      optionIndex: 2,
    },
    {
      text: 'Haast tokoeka',
      isCorrect: false,
      questionId: "4",
      optionIndex: 3,
    },
    {
      text: '3',
      isCorrect: false,
      questionId: "5",
      optionIndex: 0,
    },
    {
      text: '4',
      isCorrect: false,
      questionId: "5",
      optionIndex: 1,
    },
    {
      text: '5',
      isCorrect: true,
      questionId: "5",
      optionIndex: 2,
    },
    {
      text: '6',
      isCorrect: false,
      questionId: "5",
      optionIndex: 3,
    },
  ];
  
    for (const option of options) {
      const newOption = optionRepository.create(option);
      await optionRepository.save(newOption);
    }
  };
