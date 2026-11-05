import { Outlet } from "react-router";
import { Logout } from "../components/Logout";

function ContainerLayout() {

    return (
        <div className="container-layout">
            <header className="container-header">
                <Logout />
            </header>
            <main className="container-main">
                <Outlet />
            </main>
            <footer className="container-footer">
                <nav className="container-nav">
                    {/*<Navlink to="/checkin">Inicio</Navlink>
                    <Navlink to="/">Visitas</Navlink>
                    <Navlink to="/">Entrenamiento</Navlink>
                    <Navlink to="/">Nutricion</Navlink>
                    <Navlink to="/">Perfil</Navlink> */}
                </nav>
            </footer>
        </div>
    );
}

export default ContainerLayout;