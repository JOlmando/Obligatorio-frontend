import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="auth-header">
        <svg className="auth-brand-icon" viewBox="0 0 64 32" aria-hidden="true">
          <path d="M26 14h12v4H26zM5 10h4v12H5zM13 6h5v20h-5zM22 11h4v10h-4zM46 11h-4v10h4zM51 6h-5v20h5zM59 10h-4v12h4z" />
        </svg>
        <h1>LogiGym</h1>
        <p>Entrená · Mejorá · Superate</p>
      </header>
      <main className="auth-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;