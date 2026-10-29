import { configureStore } from '@reduxjs/toolkit';


//El configureStore recibe un objeto de configuración donde se define el reducer principal y otras opciones del store.

//UN REDUCER ES UNA FUNCION QUE RECIBE EL ESTADO ACTUAL Y UNA ACCION, Y DEVUELVE EL NUEVO ESTADO.
const placeholderSlice = createSlice({
    name: 'placeholder',
    initialState: {},
    reducers: {}
});

export const store = configureStore({
    reducer: {
        placeholder: placeholderSlice.reducer
    }
});