import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface resultState{
    userId: number,
    result : {
        [questionId: number]: number | undefined;
    },
}

const initialState: resultState = {
    userId: 0,
    result: {}
}

export const resultsSlice = createSlice({
    name : 'result',
    initialState,
    reducers : {
        setUserId : (state, action: PayloadAction<number>) => {
            return{
                ...state,
                userId: action.payload
            }
        },
        addResultAction: (state, action: PayloadAction<{ questionId: number, userChoice: number | undefined }>) => {
            console.log('result reducer: '+ state);
            const { questionId, userChoice } = action.payload;
            return {
                ...state,
                result: {
                    ...state.result,
                    [questionId]: userChoice
                }
            }
        },
        resetResultAction : () => {
            return{
                userId: 0,
                result: []
            }
        }
    }
})

export const { setUserId, addResultAction, resetResultAction } = resultsSlice.actions;
export default resultsSlice.reducer;