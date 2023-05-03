import React, { useState, useEffect } from 'react'
import data from '../database/quizData'
import { useFetchQuestion } from '../customHooks/fetchQuestions';
import { useAppSelector } from '../redux/hooks'
import '../styles/questions.module.css';
type Props = {
    onChecked: (optionChecked: number) => void
}

export default function Questions({ onChecked }:Props) {

    const [checked, setChecked] = useState<string | undefined>(undefined)
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()
    const questions = useAppSelector(state => state.questions.queue[state.questions.trace])
    const trace = useAppSelector(state => state.questions.trace)
    useEffect(()=> {

    });

    const onSelect = (userAnswer : number) => {
        onChecked(userAnswer)
        // console.log(userAnswer)
    }
    // if(isLoading) return <h3 className="text-light"> isLoading</h3>
    // if(serverError) return <h3 className="text-light"> Unknown error </h3>

  return (
    <div className='questions-container'>
        <h2 className='text-3xl py-3'>{questions?.question}</h2>
        <ul key={trace}>
            {
                questions?.answers.map((question, index)=> (
                    <li key={index}>
                        <input 
                            type="radio" 
                            value={false.toString()}
                            name="options" 
                            id={`question-${index}-option`} 
                            onChange={()=> onSelect(index)} 
                        />
                    <label className="text-center" htmlFor={`question-${index}-option`}>{question?.answer}</label>
                    <div className="check"></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}