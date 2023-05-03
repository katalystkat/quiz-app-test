import React, {useEffect, useState} from 'react'
import History from './History';
import {Link, useNavigate} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { resetQuizAction } from '../redux/reducers/questionReducer';
import { resetResultAction } from '../redux/reducers/resultsReducer';
import { useFetchAnswers } from '../customHooks/fetchQuestions';
import { AddHistoryAction } from '../customHooks/fetchHistory';
import { calculateScore } from '../helper/scoring'
import { logoutUser } from '../helper/apiCalls';
import toast from 'react-hot-toast'
import styles from '../styles/home.module.css'

type Props = {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export default function Results({ setIsLoggedIn}: Props) {
    const [{isLoading, apiData, serverError}] = useFetchAnswers();
    const state = useAppSelector(state => state)
    const answers = useAppSelector(state => state.answer.answers)
    const results = useAppSelector(state => state.result.result)
    const [hasAddedHistory, setHasAddedHistory] = useState(false)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();//TODO need to get userID from storage, and replace line 32
    function onRestart(){
        dispatch(resetQuizAction());
        dispatch(resetResultAction());
    }

    const handleLogout = async () => {
      try{
        const response = await logoutUser();
        if (response) {
          toast.success('Logout Success, eating kiwi...');
          await localStorage.clear();
          setIsLoggedIn(false);
          navigate('/')
        } else {
          return toast.error('Unable to logout')
        }
      } catch (error) {
        console.log(error);
      }
    }

  // useEffect(() => {
  //   if (Object.keys(results).length > 0 && Object.keys(answers).length > 0 && !hasAddedHistory) {
  //     console.log("first quiz result");
  //     const addHistory = async () => {
  //       const score = calculateScore(results, answers);
  //       const userId = localStorage.getItem("userId") || "default_userId";
  //       const date = new Date();
  //       await dispatch(
  //         AddHistoryAction(userId, {
  //           userId: userId,
  //           date: date.toLocaleDateString(),
  //           userResults: results,
  //           userScore: score.percentage,
  //         })
  //       );
  //       setHasAddedHistory(true);
  //     };
  //     addHistory();
  //   }
  // }, [results, answers, hasAddedHistory]);
// above is most recent


    const score = calculateScore(results, answers)
    
    if(isLoading) return <h3 className="text-light"> isLoading</h3>
    if(serverError) return <h3 className="text-light"> Unknown error </h3>

    return (
      <div className="container mx-auto">
        <div className="flex justify-center h-screen py-1 items-center">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
          <h1 className={styles.appTitle}> Quiz Application</h1>
          <div className="text-left">
              <div className="flex flex-row" >
                  <span className={styles.resultsKey}>Username: </span>
                  <span className={styles.resultsValue}>Kat</span>
              </div>
              <div className="flex" >
                  <span className={styles.resultsKey}>Total Quiz Points: </span>
                  <span className={styles.resultsValue}>{score.percentage}</span>
              </div>
              <div className="flex" >
                  <span className={styles.resultsKey}>Correct Count </span>
                  <span className={styles.resultsValue}>{score.correctCount}</span>
              </div>
              <div className="flex" >
                  <span className={styles.resultsKey}>Quiz Result: </span>
                  <span className={styles.resultsValue}>{score.percentage > 70 ? "PASS" : "FAIL"}</span>
              </div>
                 
              <div className="container py-16">
                  <History/>
              </div></div>
              <div>
              <Link className={styles.btn} to="/quiz" onClick={onRestart}>Restart</Link>
              </div>
              <div>
              <Link className={styles.btn} to="/" onClick={handleLogout}>Logout</Link>
              </div>
              </div></div>
          </div>
      </div>
    )
  }