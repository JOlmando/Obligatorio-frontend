// import { createSlice } from '@reduxjs/toolkit';

// const initialState = { categorias: [] }; 


// const categoriasSlice = createSlice({
//     name: 'categorias',
//     initialState: initialState,
//     reducers: {
//         //immer 
//         guardarCategorias: (state, action) => {
//             state.categorias = action.payload;
//         },
//         agregarCategoria: (state, action) => {  
//             state.categorias.push(action.payload);
//         },

//         eliminarCategoria: (state, action) => {
//             const categoriaId = action.payload;
//             state.categorias = state.categorias.filter(categoria => categoria._id !== categoriaId);
//         }

//     }
// });

// export const { guardarCategorias, agregarCategoria, eliminarCategoria } = categoriasSlice.actions;

// export default categoriasSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    obtenerCategoriasAPI,
    crearCategoriaAPI,
    actualizarCategoriaAPI,
    eliminarCategoriaAPI
} from "../services/categoria.services";


// =====================================
// 1. THUNKS
// =====================================

// GET
export const cargarCategorias = createAsyncThunk(
    "categorias/cargar",
    async (_, { rejectWithValue }) => {
        try {
            return await obtenerCategoriasAPI();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al cargar categorías"
            );
        }
    }
);

// POST
export const crearCategoria = createAsyncThunk(
    "categorias/crear",
    async (datos, { rejectWithValue }) => {
        try {
            return await crearCategoriaAPI(datos);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al crear categoría"
            );
        }
    }
);

// PUT
export const actualizarCategoria = createAsyncThunk(
    "categorias/actualizar",
    async ({ id, datos }, { rejectWithValue }) => {
        try {
            return await actualizarCategoriaAPI(id, datos);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al actualizar categoría"
            );
        }
    }
);

// DELETE
export const borrarCategoria = createAsyncThunk(
    "categorias/borrar",
    async (id, { rejectWithValue }) => {
        try {
            return await eliminarCategoriaAPI(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al eliminar categoría"
            );
        }
    }
);


// =====================================
// 2. ESTADO INICIAL
// =====================================

const initialState = {
    categorias: [],

    status: {
        cargar: "idle",
        crear: "idle",
        actualizar: "idle",
        borrar: "idle"
    },

    error: {
        cargar: null,
        crear: null,
        actualizar: null,
        borrar: null
    }
};


// =====================================
// 3. SLICE
// =====================================

const categoriasSlice = createSlice({

    name: "categorias",

    initialState,

    reducers: {

        // Guardar categorías manualmente
        guardarCategorias: (state, action) => {
            state.categorias = action.payload;
        },

        limpiarCategorias: () => initialState

    },

    extraReducers: (builder) => {

        // =====================================
        // CARGAR CATEGORÍAS - GET
        // =====================================

        builder

            .addCase(cargarCategorias.pending, (state) => {
                state.status.cargar = "loading";
                state.error.cargar = null;
            })

            .addCase(cargarCategorias.fulfilled, (state, action) => {
                state.status.cargar = "succeeded";
                state.categorias = action.payload;
            })

            .addCase(cargarCategorias.rejected, (state, action) => {
                state.status.cargar = "failed";
                state.error.cargar =
                    action.payload ?? action.error.message;
            })


        // =====================================
        // CREAR CATEGORÍA - POST
        // =====================================

            .addCase(crearCategoria.pending, (state) => {
                state.status.crear = "loading";
                state.error.crear = null;
            })

            .addCase(crearCategoria.fulfilled, (state, action) => {
                state.status.crear = "succeeded";
                state.categorias.push(action.payload);
            })

            .addCase(crearCategoria.rejected, (state, action) => {
                state.status.crear = "failed";
                state.error.crear =
                    action.payload ?? action.error.message;
            })


        // =====================================
        // ACTUALIZAR CATEGORÍA - PUT
        // =====================================

            .addCase(actualizarCategoria.pending, (state) => {
                state.status.actualizar = "loading";
                state.error.actualizar = null;
            })

            .addCase(actualizarCategoria.fulfilled, (state, action) => {
                state.status.actualizar = "succeeded";

                const index = state.categorias.findIndex(
                    categoria => categoria._id === action.payload._id
                );

                if (index !== -1) {
                    state.categorias[index] = action.payload;
                }
            })

            .addCase(actualizarCategoria.rejected, (state, action) => {
                state.status.actualizar = "failed";
                state.error.actualizar =
                    action.payload ?? action.error.message;
            })


        // =====================================
        // ELIMINAR CATEGORÍA - DELETE
        // =====================================

            .addCase(borrarCategoria.pending, (state) => {
                state.status.borrar = "loading";
                state.error.borrar = null;
            })

            .addCase(borrarCategoria.fulfilled, (state, action) => {
                state.status.borrar = "succeeded";

                state.categorias = state.categorias.filter(
                    categoria => categoria._id !== action.payload
                );
            })

            .addCase(borrarCategoria.rejected, (state, action) => {
                state.status.borrar = "failed";
                state.error.borrar =
                    action.payload ?? action.error.message;
            });

    }
});


// =====================================
// 4. EXPORTACIONES
// =====================================

export const { guardarCategorias, limpiarCategorias } = categoriasSlice.actions;

export default categoriasSlice.reducer;
