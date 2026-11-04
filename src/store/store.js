import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login.slice'

export const store = configureStore({
  reducer: {
    login: loginReducer
  }
})

