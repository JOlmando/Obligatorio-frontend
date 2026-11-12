import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarCategorias } from "../features/categorias.slice";
import {
    cargarVisitas,
    cargarVisitasEntreFechas
} from "../features/visitas.slices";
import ListaVisitas from "../components/visita/ListaVisitas";
import { useNavigate } from "react-router";

const VisitasPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pagina, setPagina] = useState(1);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [filtroFechas, setFiltroFechas] = useState({ min: "", max: "" });
    const [errorFiltro, setErrorFiltro] = useState("");
    const { visitas, status: estadoVisitas, error: errorVisitas } = useSelector(
        (state) => state.visitas
    );

    const {
        categorias,
        status: estadoCategorias,
        error: errorCategorias
    } = useSelector((state) => state.categorias);

    useEffect(() => {
        const filtros = {
            page: pagina,
            limit: 7,
            fechaInicio: filtroFechas.min || undefined,
            fechaFin: filtroFechas.max || undefined
        };

        const tieneFiltroFechas = filtroFechas.min || filtroFechas.max;

        dispatch(
            tieneFiltroFechas
                ? cargarVisitasEntreFechas(filtros)
                : cargarVisitas({ page: pagina, limit: 7 })
        );
    }, [dispatch, pagina, filtroFechas]);

    useEffect(() => {
        dispatch(cargarCategorias());
    }, [dispatch]);

    const aplicarFiltro = (event) => {
        event.preventDefault();

        if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
            setErrorFiltro("La fecha desde no puede ser posterior a la fecha hasta.");
            return;
        }

        setErrorFiltro("");
        setPagina(1);
        setFiltroFechas({ min: fechaInicio, max: fechaFin });
    };

    const limpiarFiltro = () => {
        setFechaInicio("");
        setFechaFin("");
        setErrorFiltro("");
        setPagina(1);
        setFiltroFechas({ min: "", max: "" });
    };

    if (estadoVisitas.cargar === "idle" || estadoVisitas.cargar === "loading") {
        return <p>Cargando visitas...</p>;
    }

    if (estadoVisitas.cargar === "failed") {
        return <p role="alert">{errorVisitas.cargar}</p>;
    }

    const cargandoCategorias =
        estadoCategorias.cargar === "idle" ||
        estadoCategorias.cargar === "loading";

    if (cargandoCategorias) {
        return <p>Cargando categorías...</p>;
    }

    return (
        <div className="visitas-page">
            <h1>Mis visitas</h1>
            <form onSubmit={aplicarFiltro}>
                <label>Desde
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(event) => setFechaInicio(event.target.value)}
                    />
                </label>
                <label>Hasta
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(event) => setFechaFin(event.target.value)}
                    />
                </label>
                <button type="submit">Filtrar</button>
                <button type="button" onClick={limpiarFiltro}>
                    Limpiar
                </button>
                <button type="button" onClick={() => navigate("/stats")}>
                    Stats
                </button>
                {errorFiltro && <p role="alert">{errorFiltro}</p>}
            </form>
            {estadoCategorias.cargar === "failed" && (
                <p role="alert">
                    No se pudieron cargar las categorías: {errorCategorias.cargar}
                    . Las acciones de las visitas están deshabilitadas.
                </p>
            )}
            <ListaVisitas
                visitas={visitas}
                categorias={
                    estadoCategorias.cargar === "succeeded" ? categorias : []
                }
            />
            <nav aria-label="Paginación de visitas">
                <button
                    type="button"
                    disabled={pagina === 1 || estadoVisitas.cargar === "loading"}
                    onClick={() => setPagina((actual) => actual - 1)}
                >
                    Anterior
                </button>
                <span> Página {pagina} </span>
                <button
                    type="button"
                    disabled={
                        visitas.length < 7 ||
                        estadoVisitas.cargar === "loading"
                    }
                    onClick={() => setPagina((actual) => actual + 1)}
                >
                    Siguiente
                </button>
            </nav>
        </div>
    );
};

export default VisitasPage;