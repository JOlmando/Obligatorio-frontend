import { createSlice } from '@reduxjs/toolkit'

const uploadsSlice = createSlice({
  name: 'uploads',
  initialState: {
    url: ""
  },
  reducers: {
    setImagen: (state, action) => {
      state.url = action.payload?.url ?? action.payload ?? ""
    },
    resetImagen: (state) => {
      state.url = ""
    }
  }
})

export const { setImagen, resetImagen } = uploadsSlice.actions
export default uploadsSlice.reducer
