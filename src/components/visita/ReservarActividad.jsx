import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { crearVisita } from "../../features/visitas.slices";
import { crearVisitaSchema } from "../../validators/visitas.validators";

const ReservarActividad = ({ categoria, onCancelar }) => {
    const dispatch = useDispatch();
    const [errorReserva, setErrorReserva] = useState("");
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: joiResolver(crearVisitaSchema),
        mode: "onChange",
        defaultValues: { categoriaId: categoria._id }
    });
    const horarios = categoria.horarios.split(";");

    const reservar = async (visita) => {
        setErrorReserva("");
        try {
            await dispatch(crearVisita(visita)).unwrap();
            toast.success("Reserva realizada correctamente");
            onCancelar();
        } catch (error) {
            setErrorReserva(
                typeof error === "string"
                    ? error
                    : error?.message ?? "No se pudo realizar la reserva"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(reservar)}>
            <h2>{categoria.nombre}</h2>
            <input type="hidden" {...register("categoriaId")} />
            <input type="date" {...register("fecha")} required />
            {errors.fecha && <span className="error">{errors.fecha.message}</span>}
            <br />
            <select {...register("hora")} required>
                {horarios.map((horario) => (
                    <option key={horario} value={horario}>
                        {horario}
                    </option>
                ))}
            </select>
            {errors.hora && <span className="error">{errors.hora.message}</span>}
            <br />
            <br />
            <button type="button" onClick={onCancelar}>
                Cancelar
            </button>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <i className="fas fa-spinner fa-spin" /> : "Confirmar reserva"}
            </button>
            {errorReserva && <p role="alert">{errorReserva}</p>}
        </form>
    );
};

export default ReservarActividad;
