import React, {useEffect, useState} from 'react';
import Questions from './Questions';
import {} from 'react-redux';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import { GetNextQuestion, GetPrevQuestion } from '../customHooks/fetchQuestions'
import { AddQuizResult } from '../customHooks/setQuizResults';
import { AddHistoryAction } from '../customHooks/fetchHistory';
import { useNavigate } from 'react-router-dom'
import { calculateScore } from '../helper/scoring';
import styles from '../styles/home.module.css';
type Props = {}

export default function Quiz({}: Props) {
    const state = useAppSelector(state => state)
    const result = useAppSelector(state => state.result.result)
    const { queue, trace } = useAppSelector(state => state.questions);
    const [check, setChecked] = useState<number | undefined>(undefined)
    const [lastQuestion, setLastQuestion] = useState(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const date = new Date();
    const formattedDate = date.toLocaleString();
    const userId = localStorage.getItem('userId') || 'default_user';

    async function onNext(){
        if(trace < queue.length){
            if (result[trace] !== check && check !== undefined) dispatch(AddQuizResult(trace, check));
            dispatch(GetNextQuestion());
            setChecked(undefined);
        }
        if(trace === queue.length -2) {setLastQuestion(true)}
        else if (lastQuestion){
            await dispatch(AddQuizResult(trace, check));
            const score = await calculateScore(result, state.answer.answers)
            // await dispatch(AddHistoryAction("attemptId", {userId: userId, date: formattedDate, userResults: result, userScore: score.percentage} ))
            // console.log(state)
            navigate('/results', {replace: true});
        }
    }

    function onPrev(){
        setLastQuestion(false)
        dispatch(GetPrevQuestion())
        // console.log('on prevclick')
    }

    function handleChecked(optionChecked:any){
        setChecked(optionChecked)
        // console.log(optionChecked)
    }
    
  return (
    <div className="container mx-auto">
        <div className="flex justify-center h-screen items-center">
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
        <h1 className="title text-5xl py-2 text-light">Do you R E A L L Y know kiwis?</h1>
       <span className="text-xl text-center w-2/3"> Quiz span</span>
       <Questions onChecked={handleChecked}/>
        <div className="grid">
            { trace > 0 ? <button className={styles.btn} onClick={onPrev}>Previous</button>: <div></div> }
            <button className={styles.btn} onClick={onNext}>{(lastQuestion) ? "Complete" : "Next"}</button>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}