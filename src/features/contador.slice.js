import { createSlice } from '@reduxjs/toolkit';

//EL METODO CREATE SLICE ESPERA COMO PARAMETRO UN OBJETO DE CONFIGURACION QUE CONTIENE:
// name: NOMBRE DEL SLICE
// initialState: ESTADO INICIAL DEL SLICE
// reducers: OBJETO CON LAS FUNCIONES REDUCER QUE DEFINEN COMO SE ACTUALIZA EL ESTADO
// CADA FUNCION RECIBE EL STATE ACTUAL Y LA ACCION, Y DEVUELVE EL NUEVO STATE

const initialState = {
    cuenta: 0
};

export const contadorSlice = createSlice({
    // NOMBRE DEL SLICE
    name: 'contador',
    // ESTADO INICIAL DEL SLICE
    initialState: initialState,
    // REDUCERS QUE DEFINEN COMO SE ACTUALIZA EL ESTADO
        //Los reducers son funciones puras que reciben el state actual y la acción, y devuelven el nuevo state.
        //dado que los states son inmutables, el reducer lo que hace es copiar el state, aplicar los cambios y devolver o asignar el nuevo state.
    reducers: {
        incrementar: (state) => {
            //immer es una biblioteca de manejo de inmutabilidad que se encuentra dentro de las dependencias de Redux Toolkit.
            //gracias a immer podemos modificar el state directamente dentro del reducer, 
            //y immer se encarga de crear una copia inmutable del state con los cambios aplicados.


            //state.cuenta += 1;

            state.cuenta++;
        },
        decrementar: (state) => {
            state.cuenta -= 1;
        }
    }
});

export const { incrementar, decrementar } = contadorSlice.actions;
export default contadorSlice.reducer;