import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: null, usuario: null }; 

const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        guardarToken: (state, action) => {
            state.token = action.payload;
        },

        guardarUsuario: (state, action) => {
            state.usuario = action.payload;
        },

        limpiarToken: () => initialState
    }  
});


export const { guardarToken, guardarUsuario, limpiarToken } = tokenSlice.actions;
export default tokenSlice.reducer;
