import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: null, nombre: null }; 

const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        guardarToken: (state, action) => {
            state.token = action.payload;
        },

        guardarNombre: (state, action) => {
            state.nombre = action.payload;
        },

        limpiarToken: () => initialState
    }  
});


export const { guardarToken, guardarNombre, limpiarToken } = tokenSlice.actions;
export default tokenSlice.reducer;
