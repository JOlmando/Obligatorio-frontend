import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: null }; 

//el createslice devuel
const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        guardarToken: (state, action) => {
            state.token = action.payload;
        }
    }  
});


export const { guardarToken } = tokenSlice.actions;
export default tokenSlice.reducer;
