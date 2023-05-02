import * as HistoryAction from '../redux/reducers/historyReducer'
import { useAppDispatch } from '../redux/hooks'
import { logQuizAttempt, getQuizAttempts } from '../helper/apiCalls'
import { toast } from 'react-hot-toast'
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { Action } from 'redux';

interface AttemptDetails {
    userId: string,
    date: string,
    userResults: Record<number, number | undefined>;
    userScore: number
  }

  export const AddHistoryAction =  (userId: string, attemptDetails: AttemptDetails) => async (dispatch: ThunkDispatch<RootState, undefined, Action>): Promise<Action> =>{
    try {
        const response = await logQuizAttempt(
            userId,
            "quiz_id_1",
             attemptDetails.userScore,
        )
        return HistoryAction.addHistoryAction({attemptDetails});
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getHistoryAction =  (userId: string) => async (dispatch: ThunkDispatch<RootState, undefined, Action>): Promise<Action> =>{
    try {
        const response = await getQuizAttempts(userId)
        console.log("trying to get History");
        console.log(response);
        const attemptDetails = response.data;
        return HistoryAction.getHistoryAction({attemptDetails})
        // return HistoryAction.addHistoryAction({ attemptDetails });
    } catch (error) {
        console.log(error);
        throw error;
    }
};