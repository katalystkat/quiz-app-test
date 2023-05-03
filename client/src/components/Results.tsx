import React, {useEffect} from 'react'
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
type Props = {}

export default function Results({}: Props) {
    const [{isLoading, apiData, serverError}] = useFetchAnswers();
    const state = useAppSelector(state => state)
    const answers = useAppSelector(state => state.answer.answers)
    const results = useAppSelector(state => state.result.result)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();//TODO need to get userID from storage, and replace line 32
    function onRestart(){
        // console.log('on restart')
        dispatch(resetQuizAction());
        dispatch(resetResultAction());
    }

    const handleLogout = async () => {
      try{
        const response = await logoutUser();
        if (response) {
          toast.success('Logout Success, eating kiwi...');
          console.log('pre-clearance: ' + localStorage);
          localStorage.clear();
          console.log('post-clearance: ' + localStorage);
          navigate('/')
        } else {
          return toast.error('Unable to logout')
        }
      } catch (error) {
        console.log(error);
      }
    }
    // ASYNC PROBLEM HERE where we are savign to state the wrong score. 
    // Only posting new result to db once
    useEffect(() => {
        const addHistory = async () => {
          const score = calculateScore(results, answers);
          const userId = localStorage.getItem('userId') || 'default_userId';
          const date = new Date();
          // console.log('attempting to log new quiz info to' + userId);
          // console.log('before dispatch addHistry action, inside useEffect');
          await dispatch(
            AddHistoryAction(userId, {
              userId: userId,
              date: date.toLocaleDateString(),
              userResults: results,
              userScore: score.percentage
            })
          );
          // console.log("after we dispatch addHistoryAction")
        };
        addHistory();
      }, []);

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