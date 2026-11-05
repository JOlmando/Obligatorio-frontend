import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login.slice'
import categoriasReducer from '../features/categorias.slice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    categorias: categoriasReducer
  }
})

