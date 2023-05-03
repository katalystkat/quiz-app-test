import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {HistoryState, AttemptDetails } from '../../types/reducerTypes';


const initialState: HistoryState = {
    attemptCounter: 0,
    attemptHistory: {
        0: {
        date: "",
        userId: "test",
        userResults: {},
        userScore: 0,
        },
    },
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
      addHistoryAction: (state, action: PayloadAction<{ attemptDetails: AttemptDetails }>) => {
          const { attemptDetails } = action.payload;
          const attemptId = state.attemptCounter;
          state.attemptHistory = {
            ...state.attemptHistory,
            [attemptId]: attemptDetails,
          };
          state.attemptCounter++;
        },
        getHistoryAction: (state, action: PayloadAction<{ attemptDetails: AttemptDetails }>) => {
          const { attemptDetails } = action.payload;
          const attemptId = state.attemptCounter;
          state.attemptHistory = {
            ...state.attemptHistory,
            [attemptId]: attemptDetails,
          };
          state.attemptCounter++;
        },
      },
    });


export const { addHistoryAction, getHistoryAction } = historySlice.actions;
export default historySlice.reducer;
