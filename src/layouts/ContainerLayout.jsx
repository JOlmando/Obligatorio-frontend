import { NavLink, Outlet } from "react-router";
import Logout from "../components/Logout";

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
                    <NavLink to="/checkin">Inicio</NavLink> 
                    <NavLink to="/visitas">Visitas</NavLink>
                    {/* <NavLink to="/rutinas">Entrenamiento</NavLink>
                    <NavLink to="/calorias">Calculadora</NavLink>*/}
                    <NavLink to="/perfil">Perfil</NavLink> 
                </nav>
            </footer>
        </div>
    );
}

export default ContainerLayout;