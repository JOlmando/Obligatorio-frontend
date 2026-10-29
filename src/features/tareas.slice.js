
import { createSlice } from '@reduxjs/toolkit';

const initialState = { tareas: [] }; 

//el createslice devuel
const tareasSlice = createSlice({
    name: 'tareas',
    initialState: initialState,
    reducers: {
        //immer 
        guardarTareas: (state, action) => {
            state.tareas = action.payload;
        },
        agregarTarea: (state, action) => {  
            state.tareas.push(action.payload);
        }
    }
});


export const { guardarTareas, agregarTarea } = tareasSlice.actions;
export default tareasSlice.reducer;