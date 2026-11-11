import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actualizarVisita, borrarVisita } from "../../features/visitas.slices";

const esSalaDeMusculacion = (categoria) =>
    categoria?.nombre === "Sala de musculación";

const Visita = ({ visita, categoria }) => {
    const dispatch = useDispatch();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [editando, setEditando] = useState(false);
    const [fecha, setFecha] = useState(visita.fecha ?? "");
    const [hora, setHora] = useState(
        /^\d{2}:\d{2}$/.test(visita.hora ?? "") ? visita.hora : ""
    );
    const { actualizar, borrar } = useSelector((state) => state.visitas.status);
    const esOperacion = actualizar === "loading" || borrar === "loading";
    const permiteAcciones = Boolean(categoria) && !esSalaDeMusculacion(categoria);

    const guardarCambios = async (event) => {
        event.preventDefault();
        try {
            await dispatch(
                actualizarVisita({
                    id: visita._id,
                    datos: {
                        categoriaId: categoria._id,
                        fecha,
                        hora
                    }
                })
            ).unwrap();
            toast.success("Visita modificada correctamente");
            setEditando(false);
        } catch (error) {
            toast.error(
                typeof error === "string"
                    ? error
                    : error?.message ?? "No se pudo modificar la visita"
            );
        }
    };

    const eliminar = async () => {
        if (!window.confirm("¿Querés eliminar esta visita?")) {
            return;
        }

        try {
            await dispatch(borrarVisita(visita._id)).unwrap();
            toast.success("Visita eliminada correctamente");
        } catch (error) {
            toast.error(
                typeof error === "string"
                    ? error
                    : error?.message ?? "No se pudo eliminar la visita"
            );
        }
    };

    const fechaVisible = visita.fecha
        ? new Intl.DateTimeFormat("es-UY", { dateStyle: "long" }).format(
              new Date(`${visita.fecha}T00:00:00`)
          )
        : "Fecha no disponible";

    return (
        <article className="visita-card">
            <div className="visita-card-header">
                <div>
                    <h2>{categoria?.nombre ?? "Visita"}</h2>
                    <p className="visita-card-fecha">{fechaVisible}</p>
                    {visita.hora && (
                        <p className="visita-card-hora">Hora: {visita.hora}</p>
                    )}
                </div>
                {permiteAcciones && (
                    <div className="visita-menu">
                        <button
                            type="button"
                            className="visita-menu-toggle"
                            aria-label="Abrir opciones de la visita"
                            aria-expanded={menuAbierto}
                            onClick={() => setMenuAbierto((abierto) => !abierto)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                        {menuAbierto && (
                            <div className="visita-menu-opciones">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditando(true);
                                        setMenuAbierto(false);
                                    }}
                                >
                                    Modificar
                                </button>
                                <button
                                    type="button"
                                    className="visita-menu-eliminar"
                                    disabled={esOperacion}
                                    onClick={() => {
                                        setMenuAbierto(false);
                                        eliminar();
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {editando && (
                <form className="visita-edicion" onSubmit={guardarCambios}>
                    <label>
                        Fecha
                        <input
                            type="date"
                            value={fecha}
                            onChange={(event) => setFecha(event.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Hora
                        <input
                            type="time"
                            value={hora}
                            onChange={(event) => setHora(event.target.value)}
                            required
                        />
                    </label>
                    <div className="visita-edicion-acciones">
                        <button
                            type="button"
                            onClick={() => setEditando(false)}
                            disabled={esOperacion}
                        >
                            Cancelar
                        </button>
                        <button type="submit" disabled={esOperacion}>
                            {actualizar === "loading" ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            )}
        </article>
    );
};

export default Visita;
