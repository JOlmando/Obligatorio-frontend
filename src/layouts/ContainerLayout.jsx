import { NavLink, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";

function ContainerLayout() {
    const usuario = useSelector((state) => state.auth.usuario);
    const imagenPerfil = useSelector((state) => {
        const imagen = state.uploads.url || state.auth.usuario?.fotoPerfil;
        return typeof imagen === "string" ? imagen : imagen?.url || "";
    });
    const nombreUsuario = usuario?.username || "Usuario";

    return (
        <div className="container-layout">
            <header className="container-header">
                <div className="container-brand" aria-label="LogiGym">
                    <svg className="container-brand-icon" viewBox="0 0 40 32" aria-hidden="true">
                        <path d="M2 12v8M6 8v16M11 12v8M11 16h18M29 12v8M34 8v16M38 12v8" />
                    </svg>
                    <span>LogiGym</span>
                </div>
                <details className="container-user-menu">
                    <summary className="container-user-trigger">
                        {imagenPerfil ? (
                            <img className="container-user-photo" src={imagenPerfil} alt="" />
                        ) : (
                            <span className="container-user-fallback" aria-hidden="true">
                                {nombreUsuario.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <span className="container-user-name">{nombreUsuario}</span>
                        <svg className="container-user-chevron" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="m4 6 4 4 4-4" />
                        </svg>
                    </summary>
                    <div className="container-user-dropdown">
                        <Logout />
                    </div>
                </details>
            </header>
            <main className="container-main">
                <Outlet />
            </main>
            <footer className="container-footer">
                <nav className="container-nav">
                    <NavLink to="/checkin">
                        <svg className="container-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                        </svg>
                        <span>Inicio</span>
                    </NavLink>
                    <NavLink to="/visitas">
                        <svg className="container-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="16" rx="2" />
                            <path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2M14 17h2" />
                        </svg>
                        <span>Visitas</span>
                    </NavLink>
                    <NavLink to="/rutinas">
                        <svg className="container-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 10v4M6 7v10M9 10v4M9 12h6M15 10v4M18 7v10M21 10v4" />
                        </svg>
                        <span>Entrenamiento</span>
                    </NavLink>
                    <NavLink to="/perfil">
                        <svg className="container-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="3.5" />
                            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-1.6 2.77-.08-.02a1.7 1.7 0 0 0-1.79.58l-.05.07h-3.2l-.04-.07a1.7 1.7 0 0 0-1.8-.58l-.08.02-1.6-2.77.06-.06A1.7 1.7 0 0 0 10 15l-.08-.04v-3.2L10 11.7a1.7 1.7 0 0 0-.34-1.87l-.06-.06 1.6-2.77.08.02a1.7 1.7 0 0 0 1.79-.58l.05-.07h3.2l.04.07a1.7 1.7 0 0 0 1.8.58l.08-.02 1.6 2.77-.06.06a1.7 1.7 0 0 0-.34 1.87l.08.04v3.2z" />
                        </svg>
                        <span>Perfil</span>
                    </NavLink>
                </nav>
            </footer>
        </div>
    );
}

export default ContainerLayout;