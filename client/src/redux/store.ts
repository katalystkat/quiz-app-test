import { combineReducers, configureStore } from '@reduxjs/toolkit'
import answersReducer from './reducers/answersReducer';
import historyReducer from './reducers/historyReducer';
import questionReducer from './reducers/questionReducer';
import resultsReducer  from './reducers/resultsReducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultsReducer,
    answer: answersReducer,
    history: historyReducer,
})

export const store = configureStore({
  reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch