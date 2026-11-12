import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    obtenerVisitasAPI,   
    crearVisitaAPI,
    actualizarVisitaAPI,
    eliminarVisitaAPI,
    obtenerVisitasEntreFechasAPI
} from "../services/visita.services";

// GET
export const cargarVisitas = createAsyncThunk(
    "visitas/cargar",
    async ({ limit = 7, page = 1 } = {}, { rejectWithValue }) => {
        try {
            return await obtenerVisitasAPI({ limit, page });
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al cargar visitas"
            );
        }
    }
);

export const cargarVisitasEntreFechas = createAsyncThunk(
    "visitas/cargarEntreFechas",
    async (
        { fechaInicio, fechaFin} = {},
        { rejectWithValue }
    ) => {
        try {
            return await obtenerVisitasEntreFechasAPI(
                fechaInicio,
                fechaFin
            );
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al cargar visitas"
            );
        }
    }
);

// POST
export const crearVisita = createAsyncThunk(
    "visitas/crear",
    async (datos, { rejectWithValue }) => {
        try {
            return await crearVisitaAPI(datos);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ??
                error.message ??
                "Error al crear visita"
            );
        }
    }
);

// PUT
export const actualizarVisita = createAsyncThunk(
    "visitas/actualizar",
    async ({ id, datos }, { rejectWithValue }) => {
        try {
            return await actualizarVisitaAPI(id, datos);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al actualizar visita"
            );
        }
    }
);

// DELETE
export const borrarVisita = createAsyncThunk(
    "visitas/borrar",
    async (id, { rejectWithValue }) => {
        try {
            return await eliminarVisitaAPI(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ??
                error.message ??
                "Error al eliminar visita"
            );
        }
    }
);

const initialState = {
    visitas: [],

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


const visitasSlice = createSlice({

    name: "visitas",

    initialState,

    reducers: {

        limpiarVisitas: () => initialState

    },

    extraReducers: (builder) => {
        builder

            .addCase(cargarVisitas.pending, (state) => {
                state.status.cargar = "loading";
                state.error.cargar = null;
            })

            .addCase(cargarVisitas.fulfilled, (state, action) => {
                state.status.cargar = "succeeded";
                state.visitas = action.payload;
            })

            .addCase(cargarVisitas.rejected, (state, action) => {
                state.status.cargar = "failed";
                state.error.cargar =
                    action.payload ?? action.error.message;
            })

            .addCase(cargarVisitasEntreFechas.pending, (state) => {
                state.status.cargar = "loading";
                state.error.cargar = null;
            })

            .addCase(cargarVisitasEntreFechas.fulfilled, (state, action) => {
                state.status.cargar = "succeeded";
                state.visitas = action.payload;
            })

            .addCase(cargarVisitasEntreFechas.rejected, (state, action) => {
                state.status.cargar = "failed";
                state.error.cargar =
                    action.payload ?? action.error.message;
            })

            .addCase(crearVisita.pending, (state) => {
                state.status.crear = "loading";
                state.error.crear = null;
            })

            .addCase(crearVisita.fulfilled, (state, action) => {
                state.status.crear = "succeeded";
                state.visitas.push(action.payload);
            })

            .addCase(crearVisita.rejected, (state, action) => {
                state.status.crear = "failed";
                state.error.crear =
                    action.payload ?? action.error.message;
            })


            .addCase(actualizarVisita.pending, (state) => {
                state.status.actualizar = "loading";
                state.error.actualizar = null;
            })

            .addCase(actualizarVisita.fulfilled, (state, action) => {
                state.status.actualizar = "succeeded";

                const index = state.visitas.findIndex(
                    visita => visita._id === action.payload._id
                );

                if (index !== -1) {
                    state.visitas[index] = action.payload;
                }
            })

            .addCase(actualizarVisita.rejected, (state, action) => {
                state.status.actualizar = "failed";
                state.error.actualizar =
                    action.payload ?? action.error.message;
            })


            .addCase(borrarVisita.pending, (state) => {
                state.status.borrar = "loading";
                state.error.borrar = null;
            })

            .addCase(borrarVisita.fulfilled, (state, action) => {
                state.status.borrar = "succeeded";

                state.visitas = state.visitas.filter(
                    visita => visita._id !== action.payload
                );
            })

            .addCase(borrarVisita.rejected, (state, action) => {
                state.status.borrar = "failed";
                state.error.borrar =
                    action.payload ?? action.error.message;
            });

    }
});


export const { limpiarVisitas } = visitasSlice.actions;

export default visitasSlice.reducer;
