import { createSlice } from '@reduxjs/toolkit';

const initialState = { categorias: [] }; 

//el createslice devuel
const categoriasSlice = createSlice({
    name: 'categorias',
    initialState: initialState,
    reducers: {
        //immer 
        guardarCategorias: (state, action) => {
            state.categorias = action.payload;
        },
        agregarCategoria: (state, action) => {  
            state.categorias.push(action.payload);
        },

        eliminarCategoria: (state, action) => {
            const categoriaId = action.payload;
            state.categorias = state.categorias.filter(categoria => categoria._id !== categoriaId);
        }

    }
});


export const { guardarCategorias, agregarCategoria, eliminarCategoria } = categoriasSlice.actions;
export default categoriasSlice.reducer;