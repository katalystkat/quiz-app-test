import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttemptDetails {
  date: string,
  userResults: Record<number, number | undefined>;
  userScore: number
}

interface AttemptHistory {
    [attemptId: string]: AttemptDetails;
}

interface HistoryState {
  attemptCounter: number;
  attemptHistory: AttemptHistory;
}

const initialState: HistoryState = {
    attemptCounter: 0,
    attemptHistory: {
        0: {
        date: "",
        userResults: {},
        userScore: 0,
        },
    },
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
      addHistoryAction: (state, action: PayloadAction<{ attemptId: string; attemptDetails: AttemptDetails }>) => {
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


export const { addHistoryAction } = historySlice.actions;
export default historySlice.reducer;
