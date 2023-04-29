import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Answer {
  questionId: number;
  answer: number | undefined;
}

interface AnswerState {
  answers: Record<number, number | undefined>;
}

const initialState: AnswerState = {
  answers: {},
};

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    addAnswerAction: (state, action: PayloadAction<Answer>) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    setAnswersAction: (state, action: PayloadAction<Record<number, number | undefined>>) => {
      state.answers = action.payload;
    },
    clearAnswersAction: (state) => {
      state.answers = {};
    },
  },
});

export const { addAnswerAction, setAnswersAction, clearAnswersAction } = answerSlice.actions;
export default answerSlice.reducer;
