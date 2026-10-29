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
                    <Navlink to="/">Inicio</Navlink>
                    <Navlink to="/">Visitas</Navlink>
                    <Navlink to="/">Entrenamiento</Navlink>
                    <Navlink to="/">Nutricion</Navlink>
                    <Navlink to="/">Perfil</Navlink>
                </nav>
            </footer>
        </div>
    );
}

export default ContainerLayout;