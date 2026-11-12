import { useState } from "react";
import { crearRutinaAPI } from "../services/rutina.service";

const RutinasPage = () => {
    const [musculos, setMusculos] = useState("");
    const [rutina, setRutina] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const crearRutina = async (event) => {
        event.preventDefault();
        const musculosIngresados = musculos.trim();

        if (!musculosIngresados || cargando) {
            return;
        }

        setCargando(true);
        setError("");

        try {
            const resultado = await crearRutinaAPI({
                musculos: musculosIngresados
            });
            setRutina(resultado);
        } catch (errorRutina) {
            setError(
                errorRutina?.response?.data?.message ||
                    errorRutina?.message ||
                    "No se pudo generar la rutina."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="rutinas-page">
            <div className="rutinas-content">
                <h1>Generar rutina</h1>
                <form className="rutinas-form" onSubmit={crearRutina}>
                    <label htmlFor="rutina-musculos">
                        Músculos a trabajar
                        <input
                            id="rutina-musculos"
                            type="text"
                            value={musculos}
                            onChange={(event) => setMusculos(event.target.value)}
                            placeholder="Ej.: Espalda, Bíceps"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={!musculos.trim() || cargando}
                    >
                        {cargando ? "Generando..." : "Crear rutina"}
                    </button>
                </form>

                {error && <p className="rutinas-error" role="alert">{error}</p>}

                {rutina && (
                    <article className="rutina-card" aria-live="polite">
                        <h2>Tu rutina</h2>
                        <p className="rutina-card-musculos">{rutina.musculos}</p>
                        <p className="rutina-card-ejercicios">{rutina.ejercicios}</p>
                    </article>
                )}
            </div>
        </main>
    );
};

export default RutinasPage;
