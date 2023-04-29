import { useState, useEffect, SetStateAction } from "react"
import { quizAnswers } from '../database/quizData';
import {useAppDispatch} from '../redux/hooks'
import * as Action from '../redux/reducers/answersReducer'
// Custom Hooks
// fetch question hook to fetch api data and set value to store
interface Answers {
    [questionId: number] : number
}
interface FetchAnswerData {
    isLoading: boolean,
    apiData: Answers,
    serverError: string | null | unknown,
}
export const useFetchAnswers = (): [FetchAnswerData, React.Dispatch<SetStateAction<FetchAnswerData>>] => {
    const dispatch = useAppDispatch();
    const [getAnswers, setGetAnswers] = useState<FetchAnswerData>({
        isLoading: false, 
        apiData: {}, 
        serverError: null
    });

    useEffect(()=> {
        setGetAnswers(prev => ({...prev, isLoading: true}));
        // console.log('setting loading to true');
        ( async ()=> {
            try{
                const answers = quizAnswers;
                if(Object.keys(answers).length > 0){
                    setGetAnswers(prev=> ({
                        ...prev,
                        isLoading: false,
                        apiData: answers,
                    }));
                    dispatch(Action.setAnswersAction(answers))
                } else {
                    throw new Error("No Question Available")
                }
            } catch (error) {
                setGetAnswers(prev => ({
                    ...prev, 
                    isLoading : false,
                    serverError: error
                }));
            }
        })();
    }, [dispatch]);
        return [getAnswers, setGetAnswers];
};  


