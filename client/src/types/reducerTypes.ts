// Question Reducer Types
export interface Answer {
    questionId: number;
    answer: number | undefined;
  }
  
export interface AnswerState {
    answers: Record<number, number | undefined>;
  }

//   Quiz Attempts Reducers Interfaces
export interface AttemptDetails {
userId: string,
date: string,
userResults: Record<number, number | undefined>;
userScore: number
}

export interface AttemptHistory {
    [attemptId: number]: AttemptDetails;
}

export interface HistoryState {
attemptCounter: number;
attemptHistory: AttemptHistory;
}

// Question Reducer Types

interface Question {
    id: number;
    question: string;
    answers: {answer: string; correct: boolean}[]
}

export interface UserState{
    queue: Question[],
    answers: string[],
    trace: number,
}

// Results Reducer Types

export interface resultState{
    userId: string,
    result : {
        [questionId: number]: number | undefined;
    },
}