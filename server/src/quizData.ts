import { getRepository } from 'typeorm';
import { Quiz } from './entities/quiz';
import { Question } from './entities/question';
import { Option } from './entities/option';

const quizRepository = getRepository(Quiz);
const questionRepository = getRepository(Question);
const optionRepository = getRepository(Option);

const kiwiQuiz = new Quiz();
kiwiQuiz.name = 'Kiwis Quiz';

// Create the questions and options
const questions = [
  {
    text: 'What is the scientific name for kiwi?',
    options: [
      { text: 'Apteryx mantelli', isCorrect: true },
      { text: 'Apteryx australis', isCorrect: false },
      { text: 'Apteryx haastii', isCorrect: false },
      { text: 'Apteryx owenii', isCorrect: false },
    ],
  },
  {
    text: 'Where are kiwis native to?',
    options: [
      { text: 'Australia', isCorrect: false },
      { text: 'New Zealand', isCorrect: true },
      { text: 'Papua New Guinea', isCorrect: false },
      { text: 'Indonesia', isCorrect: false },
    ],
  },
  {
    text: 'What is the size of a kiwi bird?',
    options: [
      { text: '2-3 cm', isCorrect: false },
      { text: '10-20 cm', isCorrect: false },
      { text: '30-40 cm', isCorrect: true },
      { text: '50-60 cm', isCorrect: false },
    ],
  },
  {
    text: 'What is the lifespan of a kiwi bird?',
    options: [
      { text: '5-10 years', isCorrect: false },
      { text: '15-20 years', isCorrect: true },
      { text: '25-30 years', isCorrect: false },
      { text: '35-40 years', isCorrect: false },
    ],
  },
  {
    text: 'What are kiwis commonly used for in cooking?',
    options: [
      { text: 'Salads', isCorrect: false },
      { text: 'Sauces', isCorrect: false },
      { text: 'Smoothies', isCorrect: true },
      { text: 'Candies', isCorrect: false },
    ],
  },
];

// Save the questions and options to the database
const savedQuestions = await Promise.all(
  questions.map(async (q) => {
    const question = new Question();
    question.text = q.text;
    question.quiz = kiwiQuiz;
    const savedQuestion = await questionRepository.save(question);

    const options = q.options.map((o) => {
      const option = new Option();
      option.question = savedQuestion;
      option.text = o.text;
      option.isCorrect = o.isCorrect;
      return option;
    });

    return optionRepository.save(options);
  })
);

// Set the questions on the quiz
kiwiQuiz.questions = savedQuestions.flat();

// Save the quiz to the database
await quizRepository.save(kiwiQuiz);

// -- INSERT INTO quiz (name) VALUES ('Kiwis Quiz');
// -- -- create quiz table
// -- CREATE TABLE quiz (
// --   id SERIAL PRIMARY KEY,
// --   name VARCHAR(255) NOT NULL
// -- );

// -- -- insert quiz data
// -- INSERT INTO quiz (name)
// -- VALUES ('Kiwi Trivia Quiz');

// -- -- get quiz ID
// -- SELECT id FROM quiz WHERE name = 'Kiwi Trivia Quiz';

// -- -- create questions table
// -- CREATE TABLE question (
// --   id SERIAL PRIMARY KEY,
// --   quiz_id INTEGER NOT NULL,
// --   text VARCHAR(255) NOT NULL,
// --   FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
// -- );

// -- -- insert questions data
// -- INSERT INTO question (quiz_id, text)
// -- VALUES
// --   (1, 'What is the scientific name for kiwi?'),
// --   (1, 'Where are kiwis native to?'),
// --   (1, 'What is the size of a kiwi bird?'),
// --   (1, 'What is the lifespan of a kiwi bird?'),
// --   (1, 'What are kiwis commonly used for in cooking?');

// -- -- get question IDs
// -- SELECT id FROM question WHERE quiz_id = 1;

// -- -- create options table
// -- CREATE TABLE option (
// --   id SERIAL PRIMARY KEY,
// --   question_id INTEGER NOT NULL,
// --   text VARCHAR(255) NOT NULL,
// --   is_correct BOOLEAN NOT NULL,
// --   option_index INTEGER NOT NULL,
// --   FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
// -- );

// -- -- insert options data
// -- INSERT INTO option (question_id, text, is_correct, option_index)
// -- VALUES
// --   (1, 'Apteryx mantelli', true, 1),
// --   (1, 'Apteryx australis', false, 2),
// --   (1, 'Apteryx haastii', false, 3),
// --   (1, 'Apteryx owenii', false, 4),
// --   (2, 'Australia', false, 1),
// --   (2, 'New Zealand', true, 2),
// --   (2, 'Papua New Guinea', false, 3),
// --   (2, 'Indonesia', false, 4),
// --   (3, '2-3 cm', false, 1),
// --   (3, '10-20 cm', false, 2),
// --   (3, '30-40 cm', true, 3),
// --   (3, '50-60 cm', false, 4),
// --   (4, '5-10 years', false, 1),
// --   (4, '15-20 years', true, 2),
// --   (4, '25-30 years', false, 3),
// --   (4, '35-40 years', false, 4),
// --   (5, 'Salads', false, 1),
// --   (5, 'Sauces', false, 2),
// --   (5, 'Smoothies', true, 3),
// --   (5, 'Candies', false, 4);
