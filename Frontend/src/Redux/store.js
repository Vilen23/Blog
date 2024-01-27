import { configureStore } from '@reduxjs/toolkit'
import userReducer from './User/UserSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})