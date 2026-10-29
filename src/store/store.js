import { configureStore } from '@reduxjs/toolkit'

import forecastReducer from '../features/forecast/forecast.slice'


const store = configureStore({
  reducer: {
    // Agrega tus reducers aquí
    forecast: forecastReducer
  }
})

export default store