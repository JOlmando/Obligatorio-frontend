import { Outlet } from "react-router";

function VisitasLayout() {
  return (
    <div className="visitas-layout">
      <header className="visitas-header">
        
      </header>
      <main className="visitas-main">
        <Outlet />
      </main>
    </div>
  );
}

export default VisitasLayout;