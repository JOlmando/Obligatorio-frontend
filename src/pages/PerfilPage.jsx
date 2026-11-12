import CambiarPlan from "../components/usuario/CambiarPlan";
import InformeUso from "../components/usuario/InformeUso";

function PerfilPage() {
    return (
        <main className="perfil-page">
            <h1>Mi perfil</h1>
            <InformeUso />
            <CambiarPlan />
        </main>
    );
}

export default PerfilPage;