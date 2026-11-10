import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: null }; 

const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        guardarToken: (state, action) => {
            state.token = action.payload;
        },
        limpiarToken: () => initialState
    }  
});


export const { guardarToken, limpiarToken } = tokenSlice.actions;
export default tokenSlice.reducer;
