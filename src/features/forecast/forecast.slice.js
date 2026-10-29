import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    maximas: [],
    minimas: [],
    time: []
}
const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setPronosticos: (state, action) => {
      state.maximas = action.payload.temperature_2m_max
      state.minimas = action.payload.temperature_2m_min
      state.time = action.payload.time
    }
   
  }
})

export const {setPronosticos} = forecastSlice.actions
export default forecastSlice.reducer