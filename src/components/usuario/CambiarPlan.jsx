import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarUsuario } from "../../features/auth.slice";
import { changePlanAPI } from "../../services/usuario.services";

function CambiarPlan() {
    const usuario = useSelector((state) => state.auth.usuario);
    const dispatch = useDispatch();
    const [esPremium, setEsPremium] = useState(
        usuario?.plan?.toLowerCase() === "premium"
    );
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const cambiarPlan = async () => {
        setCargando(true);
        setError("");

        try {
            await changePlanAPI();
            dispatch(
                guardarUsuario({
                    ...(typeof usuario === "object" && usuario !== null
                        ? usuario
                        : {}),
                    plan: "premium",
                })
            );
            setEsPremium(true);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "No se pudo cambiar el plan. Inténtalo nuevamente."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <section className="plan-card" aria-live="polite">
            {esPremium ? (
                <>
                    <h2>Plan Premium</h2>
                    <p>Disfruta de acceso a todo sin restricciones.</p>
                </>
            ) : (
                <>
                    <h2>Plan actual</h2>
                    <p>Pasate a premium para disfrutar de acceso a todo sin restricciones.</p>
                    <button
                        type="button"
                        onClick={cambiarPlan}
                        disabled={cargando}
                    >
                        {cargando ? "Cambiando plan..." : "Pasate a premium"}
                    </button>
                </>
            )}
            {error && <p role="alert">{error}</p>}
        </section>
    );
}

export default CambiarPlan;
