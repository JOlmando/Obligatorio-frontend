import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="auth-header">
        <h1>Gim-Check</h1>
        <p>Entrená · Mejorá · Superate</p>
      </header>
      <main className="auth-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;