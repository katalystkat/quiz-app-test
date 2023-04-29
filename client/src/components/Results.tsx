import React, {useEffect} from 'react'
import '../styles/result.css';
import History from './History';
import {Link} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { resetQuizAction } from '../redux/reducers/questionReducer';
import { resetResultAction } from '../redux/reducers/resultsReducer';
import { useFetchAnswers } from '../customHooks/fetchAnswers';
import { AddHistoryAction } from '../customHooks/fetchHistory';
import { calculateScore } from '../helper/scoring'

type Props = {}

export default function Results({}: Props) {
    const state = useAppSelector(state => state)
    const answers = useAppSelector(state => state.answer.answers)
    const results = useAppSelector(state => state.result.result)
    const dispatch = useAppDispatch();
    
    function onRestart(){
        // console.log('on restart')
        dispatch(resetQuizAction());
        dispatch(resetResultAction());
    }
    
    useEffect(() => {
        // console.log(state)
        console.log(state)
    }, [state, state.history]);

    const [{isLoading, apiData, serverError}] = useFetchAnswers();
    const score = calculateScore(results, answers)
    if(isLoading) return <h3 className="text-light"> isLoading</h3>
    if(serverError) return <h3 className="text-light"> Unknown error </h3>

  return (
    <div className="container">
        <h1 className="title text-light"> Quiz Application</h1>
        <div className="result flex-center">
            <div className="flex" >
                <span>Username</span>
                <span>Kat</span>
            </div>
            <div className="flex" >
                <span>Total Quiz Points:</span>
                <span>{score.percentage}</span>
            </div>
            <div className="flex" >
                <span>Correct Count </span>
                <span>{score.correctCount}</span>
            </div>
            <div className="flex" >
                <span>Quiz Result: </span>
                <span>{score.percentage > 70 ? "PASS" : "FAIL"}</span>
            </div>
            <div className="start">
                <Link className='btn' to="/quiz" onClick={onRestart}>Restart</Link>
            </div>
            <div className="container">
                <History/>
            </div>
            
        </div>
    </div>
  )
}