import { Outlet } from "react-router";

function ContainerLayout() {
    return (
        <div className="container-layout">
            <header className="container-header">
            </header>
            <main className="container-main">
                <Outlet />
            </main>
            <footer className="container-footer">
                <nav className="container-nav">
                    <navlink to="/">Inicio</navlink>
                    <navlink to="/">Visitas</navlink>
                    <navlink to="/">Entrenamiento</navlink>
                    <navlink to="/">Nutricion</navlink>
                    <navlink to="/">Perfil</navlink>
                </nav>
            </footer>
        </div>
    );
}

export default ContainerLayout;