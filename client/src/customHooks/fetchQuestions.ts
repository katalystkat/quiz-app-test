import { useState, useEffect, SetStateAction } from "react"
import quizData from '../database/quizData';
import {useAppDispatch} from '../redux/hooks'
import * as Action from '../redux/reducers/questionReducer'
// Custom Hooks
// fetch question hook to fetch api data and set value to store
interface Question {
    id: number,
    question: string,
    answers: {answer: string, correct: boolean}[],
}
interface FetchQuestionData {
    isLoading: boolean;
    apiData: Question[],
    serverError: string | null | unknown,
}
export const useFetchQuestion = (): [FetchQuestionData, React.Dispatch<SetStateAction<FetchQuestionData>>] => {
    const dispatch = useAppDispatch();
    const [getData, setGetData] = useState<FetchQuestionData>({
        isLoading: false, 
        apiData: [], 
        serverError: null
    });

    useEffect(()=> {
        setGetData(prev => ({...prev, isLoading: true}));
        // console.log('setting loading to true');
        ( async ()=> {
            try{
                const questions = quizData;
                if(questions.length > 0){
                    setGetData(prev=> ({
                        ...prev,
                        isLoading: false,
                        apiData: questions,
                    }));
                    // dispatch(Action.startQuizAction(questions[0].question))
                    dispatch(Action.startQuizAction(questions))
                } else {
                    throw new Error("No Question Available")
                }
            } catch (error) {
                setGetData(prev => ({
                    ...prev, 
                    isLoading : false,
                    serverError: error
                }));
            }
        })();
    }, [dispatch]);
        return [getData, setGetData];
};  

// nextQuestion Dispatch Function
export const GetNextQuestion = () => async (dispatch: ReturnType<typeof useAppDispatch>) => {
    try{
        dispatch(Action.nextQuestionAction());
    } catch (error) {
        console.log(error)
    }
};

export const GetPrevQuestion = () => async (dispatch: ReturnType<typeof useAppDispatch>) => {
    try{
        dispatch(Action.prevQuestionAction());
    } catch (error) {
        console.log(error)
    }
};

