import postsReducer from './slices/posts-slice'
import authReducer from './slices/auth-slice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
