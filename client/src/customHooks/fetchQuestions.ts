import { useState, useEffect, SetStateAction } from "react"
import quizData from '../database/quizData';
import {useAppDispatch} from '../redux/hooks'
import * as Action from '../redux/reducers/questionReducer'
import * as ResultsAction from '../redux/reducers/answersReducer'
import { getQuizData, getQuizAnswers } from "../helper/apiCalls";
import {QuizOption, QuizQuestion, QuizDetail, QuizData, FormattedQuestion, AnswerKey} from '../types/quizTypes'
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
    const formatQuestions = (quiz: QuizData): FormattedQuestion[] => {
        const formattedQuestions: FormattedQuestion[] = [];
      
        quiz.questions.forEach((question) => {
          const answers = quiz.options
            .filter((option) => option.questionId === question.questionId)
            .map((option) => ({
              answer: option.text,
              correct: option.isCorrect,
            }));
      
          formattedQuestions.push({
            id: parseInt(question.questionId),
            question: question.text,
            answers,
          });
        });
      
        return formattedQuestions;
    };
    useEffect(()=> {
        setGetData(prev => ({...prev, isLoading: true}));
        ( async ()=> {
            try{ 
                const data = await getQuizData("1");
                if(Object.keys(data).length > 0){
                    setGetData(prev=> ({
                        ...prev,
                        isLoading: false,
                        apiData: data,
                    }));
                    dispatch(Action.startQuizAction(formatQuestions(data)))
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
export const useFetchAnswers = (): [FetchQuestionData, React.Dispatch<SetStateAction<FetchQuestionData>>] => {
    const dispatch = useAppDispatch();
    const [getData, setGetData] = useState<FetchQuestionData>({
        isLoading: false, 
        apiData: [], 
        serverError: null
    });
    const formatQuestions = (quiz: QuizData): FormattedQuestion[] => {
        const formattedQuestions: FormattedQuestion[] = [];

        quiz.questions.forEach((question) => {
          const answers = quiz.options
            .filter((option) => option.questionId === question.questionId)
            .map((option) => ({
              answer: option.text,
              correct: option.isCorrect,
            }));
      
          formattedQuestions.push({
            id: parseInt(question.questionId),
            question: question.text,
            answers,
          });

        });
        return formattedQuestions;
    };
    const formatAnswerKey = (formattedQuestions: FormattedQuestion[]): AnswerKey => {
        const answerKey: AnswerKey = {};
        formattedQuestions.forEach((question) => {
            const correctAnswerIndex = question.answers.findIndex(
                (answer) => answer.correct
            );
            answerKey[question.id] = correctAnswerIndex;
        });
        return answerKey;
    }
    useEffect(()=> {
        setGetData(prev => ({...prev, isLoading: true}));
        ( async ()=> {
            try{ 
                const data = await getQuizData("1");
                if(Object.keys(data).length > 0){
                    setGetData(prev=> ({
                        ...prev,
                        isLoading: false,
                        apiData: data,
                    }));
                    const formattedQuestions = formatQuestions(data);
                    dispatch(ResultsAction.setAnswersAction(formatAnswerKey(formattedQuestions)))
                } else {
                    throw new Error("No Answers Available")
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

