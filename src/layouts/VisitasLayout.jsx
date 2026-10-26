import { Outlet } from "react-router";

function VisitasLayout() {
  return (
    <div className="visitas-layout">
      <header className="visitas-header">
        <h1>Gim-Check</h1>
        <p>Entrená · Mejorá · Superate</p>
      </header>
      <main className="visitas-main">
        <Outlet />
      </main>
    </div>
  );
}

export default VisitasLayout;