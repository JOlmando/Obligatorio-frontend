// import { Outlet } from "react-router-dom";

import Login from "./Outlet/login";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="auth-header">
        <h1>GymApp</h1>
        <p>Entrená · Mejorá · Superate</p>
      </header>

      <main className="auth-main">
        <Login/>
      </main>
    </div>
  );
}

export default AuthLayout;