import { createSlice } from '@reduxjs/toolkit'

const groqSlice = createSlice({
  name: 'groq',
  initialState: {
    respuesta: ""
  },
  reducers: {
    setRespuesta: (state, action) => {
      state.respuesta = action.payload.mensaje
    }
  }
})

export const { setRespuesta } = groqSlice.actions
export default groqSlice.reducer