import { configureStore } from '@reduxjs/toolkit'

import authReducer from "../features/auth.slice";
import categoriasReducer from '../features/categorias.slice'
import visitasReducer from '../features/visitas.slices'
import uploadsReducer from '../features/uploads/uploads.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categorias: categoriasReducer,
    visitas: visitasReducer,
    uploads: uploadsReducer
  }
})

