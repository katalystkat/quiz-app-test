import * as HistoryAction from "../redux/reducers/historyReducer";
import { logQuizAttempt, getQuizAttempts } from "../helper/apiCalls";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { Action } from "redux";
import { AttemptDetails } from '../types/reducerTypes';

export const AddHistoryAction =
  (userId: string, attemptDetails: AttemptDetails) =>
  async (
    dispatch: ThunkDispatch<RootState, undefined, Action>
  ): Promise<Action> => {
    try {
      const response = await logQuizAttempt(
        userId,
        "quiz_id_1",
        attemptDetails.userScore
      );
      return dispatch(HistoryAction.addHistoryAction({ attemptDetails }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getHistoryAction =
  (userId: string) =>
  async (
    dispatch: ThunkDispatch<RootState, undefined, Action>
  ): Promise<Action> => {
    try {
      const response = await getQuizAttempts(userId);
      const attemptDetails = response.data;
      return dispatch(HistoryAction.getHistoryAction({ attemptDetails }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
