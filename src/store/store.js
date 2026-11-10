import { configureStore } from '@reduxjs/toolkit'

import authReducer from "../features/auth.slice";
import categoriasReducer from '../features/categorias.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categorias: categoriasReducer
  }
})

