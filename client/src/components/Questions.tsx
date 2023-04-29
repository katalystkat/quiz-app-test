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
    const question = data[0]
    
    // const questions = useAppSelector(state => state.questions)

    const questions = useAppSelector(state => state.questions.queue[state.questions.trace])
    const trace = useAppSelector(state => state.questions.trace)
    useEffect(()=> {
        // console.log(questions)
        // console.log(questions?.question)
        // console.log(trace)
        // console.log(isLoading)
        // console.log(apiData)
        // console.log(serverError)

    });

    const onSelect = (userAnswer : number) => {
        onChecked(userAnswer)
        // console.log(userAnswer)
    }

    if(isLoading) return <h3 className="text-light"> isLoading</h3>
    if(serverError) return <h3 className="text-light"> Unknown error </h3>

  return (
    <div className='questions-container'>
        <h2 className='text-light'>{questions?.question}</h2>
        <ul key={questions?.id}>
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
                    <label className="text-primary" htmlFor={`question-${index}-option`}>{question?.answer}</label>
                    <div className="check"></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}