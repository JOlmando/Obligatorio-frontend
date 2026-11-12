import { useSelector } from "react-redux";
import CambiarPlan from "../components/usuario/CambiarPlan";
import InformeUso from "../components/usuario/InformeUso";

function PerfilPage() {
    const usuario = useSelector((state) => state.auth.usuario);
    const imagenPerfil = useSelector((state) => {
        const imagen = state.uploads.url || state.auth.usuario?.fotoPerfil;
        return typeof imagen === "string" ? imagen : imagen?.url || "";
    });
    const nombreUsuario = usuario?.nombre || usuario?.username || "Usuario";

    return (
        <main className="perfil-page">
            <section className="perfil-identidad" aria-label="Perfil de usuario">
                {imagenPerfil ? (
                    <img
                        className="perfil-identidad-foto"
                        src={imagenPerfil}
                        alt={`Foto de perfil de ${nombreUsuario}`}
                    />
                ) : (
                    <div className="perfil-identidad-fallback" aria-hidden="true">
                        {nombreUsuario.charAt(0).toUpperCase()}
                    </div>
                )}
                <h1>{nombreUsuario}</h1>
            </section>
            <InformeUso />
            <CambiarPlan />
        </main>
    );
}

export default PerfilPage;