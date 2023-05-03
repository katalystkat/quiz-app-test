import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AnswerState} from '../../types/reducerTypes';


const initialState: AnswerState = {
  answers: {},
};

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswersAction: (state, action: PayloadAction<Record<number, number | undefined>>) => {
      state.answers = action.payload;
    },
    clearAnswersAction: (state) => {
      state.answers = {};
    },
  },
});

export const { setAnswersAction, clearAnswersAction } = answerSlice.actions;
export default answerSlice.reducer;
