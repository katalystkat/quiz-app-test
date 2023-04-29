import * as Action from '../redux/reducers/historyReducer'
import { useAppDispatch } from '../redux/hooks'

interface AttemptDetails {
    date: string,
    userResults: Record<number, number | undefined>;
    userScore: number
  }

export const AddHistoryAction = (attemptId: string, attemptDetails: AttemptDetails) => async (dispatch: ReturnType<typeof useAppDispatch>) => {
    // const dispatch = useAppDispatch();
    try{
        dispatch(Action.addHistoryAction({ attemptId, attemptDetails }))
    } catch (error) {
        console.log(error)
    }
};
