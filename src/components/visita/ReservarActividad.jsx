import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { crearVisita } from "../../features/visitas.slices";

const ReservarActividad = (categoria) => {

    const dispatch = useDispatch();
    const horarios = categoria.horarios.split(";");

    console.log(horarios);

    const reservar = () => {
        // Lógica para reservar la actividad
        console.log("Reserva realizada para la categoría:", "id: " + categoria._id, "nombre: " + categoria.nombre);

        const visita = {
            categoriaId: categoria._id,
            nombreCategoria: categoria.nombre,
            horarioSeleccionado: document.getElementById("horarios").value
        };

        useEffect(() => {
            dispatch(crearVisita());
        }, [dispatch]);

        // Aquí puedes realizar la lógica para enviar la reserva al backend o realizar cualquier otra acción necesaria
    };

    return (
        <>
        <form>
            <h1 htmlFor="nameCat">{categoria.nombre}</h1>
            <select name="horarios" id="horarios">
                {horarios.map((horario, index) => (
                    <option key={index} value={horario}>
                        {horario}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <button type="button" defaultValue="Cancelar" />
            <input type="button" defaultValue="Confirmar reserva" onClick ={reservar}/>
        </form>
        </>
    );
};

export default ReservarActividad;