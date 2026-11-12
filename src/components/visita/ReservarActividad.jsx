import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { crearVisita } from "../../features/visitas.slices";
import { crearVisitaSchema } from "../../validators/visitas.validators";
import IconoCategoria from "../categoria/IconoCategoria";

const descripcionesCategoria = {
    calistenia: "Entrenamiento de fuerza con el peso de tu propio cuerpo",
    crossfit: "Entrenamiento de alta intensidad para todo el cuerpo",
    funcional: "Entrenamiento funcional para todo el cuerpo",
    yoga: "Movimiento, equilibrio y bienestar"
};

const obtenerFechaLocal = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
};

const ReservarActividad = ({ categoria, onCancelar }) => {
    const dispatch = useDispatch();
    const [errorReserva, setErrorReserva] = useState("");
    const dialogRef = useRef(null);
    const cerrarRef = useRef(null);
    const cancelarRef = useRef(onCancelar);
    const enviandoRef = useRef(false);
    const fechaId = useId();
    const horaId = useId();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: joiResolver(crearVisitaSchema),
        mode: "onChange",
        defaultValues: { categoriaId: categoria._id, fecha: "", hora: "" }
    });
    const horarios = categoria.horarios.split(";").map((horario) => horario.trim()).filter(Boolean);
    const nombreCategoria = categoria.nombre.toLowerCase();
    const descripcion = descripcionesCategoria[nombreCategoria] || "Reservá tu lugar en esta actividad.";

    useEffect(() => {
        const elementoEnfocado = document.activeElement;
        const overflowAnterior = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        cerrarRef.current?.focus();

        const manejarTecla = (event) => {
            if (event.key === "Escape" && !enviandoRef.current) {
                cancelarRef.current();
                return;
            }

            if (event.key === "Tab") {
                const elementosEnfocables = dialogRef.current?.querySelectorAll(
                    'button:not(:disabled), input:not(:disabled), select:not(:disabled)'
                );
                const primero = elementosEnfocables?.[0];
                const ultimo = elementosEnfocables?.[elementosEnfocables.length - 1];

                if (event.shiftKey && document.activeElement === primero) {
                    event.preventDefault();
                    ultimo?.focus();
                } else if (!event.shiftKey && document.activeElement === ultimo) {
                    event.preventDefault();
                    primero?.focus();
                }
            }
        };

        document.addEventListener("keydown", manejarTecla);

        return () => {
            document.removeEventListener("keydown", manejarTecla);
            document.body.style.overflow = overflowAnterior;
            elementoEnfocado?.focus();
        };
    }, []);

    useEffect(() => {
        cancelarRef.current = onCancelar;
        enviandoRef.current = isSubmitting;
    }, [isSubmitting, onCancelar]);

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

    const cerrar = () => {
        if (!enviandoRef.current) {
            onCancelar();
        }
    };

    return createPortal(
        <div
            className="reserva-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    cerrar();
                }
            }}
        >
            <section
                ref={dialogRef}
                className="reserva-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="reserva-titulo"
                aria-describedby="reserva-descripcion"
            >
                <button
                    ref={cerrarRef}
                    className="reserva-cerrar"
                    type="button"
                    aria-label="Cerrar reserva"
                    onClick={cerrar}
                    disabled={isSubmitting}
                >
                    ×
                </button>
                <header className="reserva-modal-header">
                    <IconoCategoria
                        className="reserva-modal-icono"
                        categoria={categoria}
                    />
                    <h2 id="reserva-titulo">{categoria.nombre}</h2>
                    <p id="reserva-descripcion">{descripcion}</p>
                </header>
                <form onSubmit={handleSubmit(reservar)}>
                    <input type="hidden" {...register("categoriaId")} />
                    <div className="reserva-campo">
                        <label className="reserva-etiqueta" htmlFor={fechaId}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                <path d="M16 3v4M8 3v4M3 10h18" />
                            </svg>
                            Seleccioná una fecha
                        </label>
                        <input
                            id={fechaId}
                            className="reserva-fecha"
                            type="date"
                            min={obtenerFechaLocal(new Date())}
                            {...register("fecha")}
                            onClick={(event) => {
                                if (typeof event.currentTarget.showPicker === "function") {
                                    event.currentTarget.showPicker();
                                }
                            }}
                            required
                        />
                        {errors.fecha && (
                            <span className="reserva-error">{errors.fecha.message}</span>
                        )}
                    </div>
                    <div className="reserva-campo">
                        <label className="reserva-etiqueta" htmlFor={horaId}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="3" y="4" width="18" height="17" rx="2" />
                                <path d="M16 2v4M8 2v4M3 9h18" />
                            </svg>
                            Seleccioná un horario
                        </label>
                        <span className="reserva-select-wrap">
                            <svg
                                className="reserva-select-reloj"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                            <select
                                id={horaId}
                                className="reserva-horario"
                                {...register("hora")}
                                required
                            >
                                <option value="" disabled>
                                    Elegí un horario
                                </option>
                                {horarios.map((horario) => (
                                    <option key={horario} value={horario}>
                                        {horario.replace(/\s*-\s*/, " - ")}
                                    </option>
                                ))}
                            </select>
                            <span className="reserva-select-chevron" aria-hidden="true">
                                ⌄
                            </span>
                        </span>
                        {errors.hora && (
                            <span className="reserva-error">{errors.hora.message}</span>
                        )}
                    </div>
                    {errorReserva && (
                        <p className="reserva-error" role="alert">
                            {errorReserva}
                        </p>
                    )}
                    <div className="reserva-acciones">
                        <button
                            className="reserva-boton-cancelar"
                            type="button"
                            onClick={cerrar}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            className="reserva-boton-confirmar"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Confirmando..." : "Confirmar reserva"}
                        </button>
                    </div>
                </form>
            </section>
        </div>,
        document.body
    );
};

export default ReservarActividad;
