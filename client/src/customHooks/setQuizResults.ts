import * as Action from '../redux/reducers/resultsReducer'
import { useAppDispatch } from '../redux/hooks'

export const AddQuizResult = (questionId: number, userChoice: number | undefined) => async (dispatch: ReturnType<typeof useAppDispatch>) => {
    // const dispatch = useAppDispatch();
    try{
        await dispatch(Action.addResultAction({questionId, userChoice}))
    } catch (error) {
        console.log(error)
    }
};
