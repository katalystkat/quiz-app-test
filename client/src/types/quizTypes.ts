type QuizOption = {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
  optionIndex: number;
};

type QuizQuestion = {
  id: string;
  text: string;
  quizId: string;
  questionId: string;
};

type QuizDetail = {
    id: number;
    name: string
}
type QuizData = {
  options: QuizOption[];
  questions: QuizQuestion[];
  quiz: QuizDetail[];
}

type FormattedQuestion = {
  id: number;
  question: string;
  answers: {
      answer: string; correct: boolean 
}[];
};

interface AnswerKey {
    [questionId: number]: number;
}

export type { AnswerKey, QuizOption, QuizQuestion, QuizDetail, QuizData, FormattedQuestion };
