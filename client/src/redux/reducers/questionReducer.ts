import { createSlice } from '@reduxjs/toolkit';

interface Question {
    id: number;
    question: string;
    answers: {answer: string; correct: boolean}[]
}

interface UserState{
    queue: Question[],
    answers: string[],
    trace: number,
}

const initialState: UserState = {
    queue: [],
    answers : [],
    trace : 0
}

export const questionSlice = createSlice({
    name: 'questions', 
    initialState, 
    reducers: {
        startQuizAction : (state, action) =>{
            return{
                ...state, 
                queue : action.payload,
            }
        },
        nextQuestionAction : (state) => {
            return{
                ...state,
                trace : state.trace + 1
            }
        },
        prevQuestionAction : (state) => {
            return{
                ...state,
                trace : state.trace - 1
            }
        },
        resetQuizAction : () => {
            return{
                queue: [],
                answers: [],
                trace: 0
            }
        }
    }
})

export const { startQuizAction, nextQuestionAction, prevQuestionAction, resetQuizAction } = questionSlice.actions;
export default questionSlice.reducer;