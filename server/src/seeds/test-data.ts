// seedData.ts
import { getRepository } from 'typeorm';
import { Quiz } from '../entities/quiz.js';
import { Question } from '../entities/question.js';
import { Option } from '../entities/option.js';
import { QuizAttempt } from '../entities/quizAttempt.js';
import { AppDataSource } from '../data-source.js';
import { Participant } from '../entities/participant.js'
const quizRepository = AppDataSource.getRepository(Quiz);
const questionRepository = AppDataSource.getRepository(Question);
const optionRepository = AppDataSource.getRepository(Option);
const quizAttemptRepository = AppDataSource.getRepository(QuizAttempt);
const participantRepository = AppDataSource.getRepository(Participant);
export const seedData = async () => {
    // Check if data has been seeded already
   const quizCount = await quizRepository.count();
   const isSeeded = quizCount > 0;
   if (isSeeded){
    console.log('Data Previously Seeded')
    return
   }
   
  // Seed Participant data
    const seedParticipants: Partial<Participant>[] = [
      {
        username: 'alice',
        email: 'alice@example.com',
        hashPassword: 'password1',
        salt: 'salt1',
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        hashPassword: 'password2',
        salt: 'salt2',
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        hashPassword: 'password3',
        salt: 'salt3',
      },
    ];
  
    for (const participant of seedParticipants) {
      const newParticipant = participantRepository.create(participant);
      await participantRepository.save(newParticipant);
    };
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
    { text: 'Which kiwi is about the size of a bantam, at about 0.9-1.9kg?', quizId: "1", questionId: "0" },
    { text: 'How long does it take for a kiwi egg to hatch?', quizId: "1", questionId: "1" },
    { text: 'What is the largest species of kiwi?', quizId: "1", questionId: "2" },
    { text: 'What is the smallest species of kiwi?', quizId: "1", questionId: "3" },
    { text: 'How many species of kiwi are there?', quizId: "1", questionId: "4"},
    { text: 'How many golden kiwis satisfies your RDA of Vitamin C?', quizId: "1", questionId: "5"},
    { text: 'Quantify the amount of excitement a pet Kiwi brings', quizId: "1", questionId: "6"},

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
      questionId: "0",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: 'Apteryx owenii',
      isCorrect: true,
      questionId: "0",
      optionIndex: 1,
      quizId: "1",
    },
    {
      text: 'Apteryx mantelli',
      isCorrect: false,
      questionId: "0",
      optionIndex: 2,
      quizId: "1",
    },
    {
      text: 'Apteryx haastii',
      isCorrect: false,
      questionId: "0",
      optionIndex: 3,
      quizId: "1",
    },
    {
      text: '78 days',
      isCorrect: false,
      questionId: "1",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: '84 days',
      isCorrect: true,
      questionId: "1",
      optionIndex: 1,
      quizId: "1",
    },
    {
      text: '90 days',
      isCorrect: false,
      questionId: "1",
      optionIndex: 2,
      quizId: "1",
    },
    {
      text: '100 days',
      isCorrect: false,
      questionId: "1",
      optionIndex: 3,
      quizId: "1",
    },
    {
      text: 'Great spotted kiwi, AKA Apteryx Haastii, AKA Great Grey kiwi',
      isCorrect: false,
      questionId: "2",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: 'Brown Kiwi, AKA Apteryx Mantelli',
      isCorrect: false,
      questionId: "2",
      optionIndex: 1,
      quizId: "1",
    },
    {
      text: 'Little spotted kiwi, AKA Apteryx Owenii AKA kiki pukupuku',
      isCorrect: true,
      questionId: "2",
      optionIndex: 2,
      quizId: "1",
    },
    {
      text: 'Apteryx Rowi, AKA rowi, AKA Okarito Brown Kiwi',
      isCorrect: false,
      questionId: "2",
      optionIndex: 3,
      quizId: "1",
    },
    {
      text: 'Apteryx Rowi, AKA rowi, AKA Okarito Brown Kiwi',
      isCorrect: false,
      questionId: "3",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: 'Great spotted kiwi, AKA Apteryx Haastii, AKA Great Grey kiwi',
      isCorrect: false,
      questionId: "3",
      optionIndex: 1,
      quizId: "1",
    },
    {
      text: 'Little spotted kiwi, AKA Apteryx Owenii AKA kiki pukupuku',
      isCorrect: true,
      questionId: "3",
      optionIndex: 2,
      quizId: "1",
    },
    {
      text: 'Haast tokoeka, AKA Haast Kiwi',
      isCorrect: false,
      questionId: "3",
      optionIndex: 3,
      quizId: "1",
    },
    {
      text: '3',
      isCorrect: false,
      questionId: "4",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: '4',
      isCorrect: false,
      questionId: "4",
      optionIndex: 1,
      quizId: "1",
    },
    {
      text: '5',
      isCorrect: true,
      questionId: "4",
      optionIndex: 2,
      quizId: "1",
    },
    {
      text: '6',
      isCorrect: false,
      questionId: "4",
      optionIndex: 3,
      quizId: "1",
    },
    {
      text: "5",
      isCorrect: false,
      questionId: "5",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: "10",
      isCorrect: false,
      questionId: "5",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: "1",
      isCorrect: false,
      questionId: "5",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: "<1",
      isCorrect: true,
      questionId: "5",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: "A lifetime's worth of smiles",
      isCorrect: false,
      questionId: "6",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: "About the intensity of volcanic lava",
      isCorrect: false,
      questionId: "6",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: "Akin to winning the lottery",
      isCorrect: false,
      questionId: "6",
      optionIndex: 0,
      quizId: "1",
    },
    {
      text: "Inner peace and gratitude",
      isCorrect: true,
      questionId: "6",
      optionIndex: 0,
      quizId: "1",
    }
  ];
  
    for (const option of options) {
      const newOption = optionRepository.create(option);
      await optionRepository.save(newOption);
    }
// Seed Attempt Data

const participants = await participantRepository.find();
const quizzesData = await quizRepository.find();

const quizAttempts: Partial<QuizAttempt>[] = [
  {
    user: participants[0],
    quiz: quizzesData[0],
    score: 80,
  },
  {
    user: participants[1],
    quiz: quizzesData[1],
    score: 70,
  },
  {
    user: participants[2],
    quiz: quizzesData[2],
    score: 90,
  },
];

for (const quizAttempt of quizAttempts) {
  const newQuizAttempt = quizAttemptRepository.create(quizAttempt);
  await quizAttemptRepository.save(newQuizAttempt);
}
  };
