import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { obtenerVisitasEntreFechasAPI } from "../../services/visita.services";

const formatoFecha = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
};

function InformeUso() {
    const usuario = useSelector((state) => state.auth.usuario);
    const esPremium = usuario?.plan?.toLowerCase() === "premium";
    const limite = 4;
    const [visitasSemana, setVisitasSemana] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const hoy = new Date();
        const inicioSemana = new Date(hoy);
        const diaSemana = (hoy.getDay() + 6) % 7;
        inicioSemana.setDate(hoy.getDate() - diaSemana);

        const finSemana = new Date(inicioSemana);
        finSemana.setDate(inicioSemana.getDate() + 6);

        const cargarVisitasSemana = async () => {
            try {
                const visitas = await obtenerVisitasEntreFechasAPI(
                    formatoFecha(inicioSemana),
                    formatoFecha(finSemana)
                );
                setVisitasSemana(visitas);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "No se pudo cargar el informe de uso."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarVisitasSemana();
    }, []);

    const cantidad = visitasSemana.length;
    const porcentaje = Math.min((cantidad / limite) * 100, 100);
    const restantes = Math.max(limite - cantidad, 0);

    return (
        <section className="informe-uso">
            <h2>Informe de uso</h2>
            {cargando ? (
                <p>Cargando visitas de esta semana...</p>
            ) : error ? (
                <p role="alert">{error}</p>
            ) : (
                esPremium ? (
                    <div className="informe-uso-resumen">
                        <span>Visitas realizadas esta semana</span>
                        <strong>{cantidad}</strong>
                    </div>
                ) : (
                    <>
                        <div className="informe-uso-resumen">
                            <span>Visitas por semana</span>
                            <strong>{cantidad} / {limite}</strong>
                        </div>
                        <div
                            className="informe-uso-progreso"
                            role="progressbar"
                            aria-label="Visitas realizadas esta semana"
                            aria-valuemin="0"
                            aria-valuemax={limite}
                            aria-valuenow={Math.min(cantidad, limite)}
                        >
                            <span style={{ width: `${porcentaje}%` }} />
                        </div>
                        <p>
                            {restantes > 0
                                ? `Te quedan ${restantes} visitas esta semana`
                                : "Llegaste al límite de visitas de esta semana"}
                        </p>
                    </>
                )
            )}
        </section>
    );
}

export default InformeUso;
