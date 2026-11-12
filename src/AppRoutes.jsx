import { Routes, Route } from "react-router";
import ContainerLayout from "./layouts/ContainerLayout"
import ProtectedRoute from './guards/ProtectedRoute'
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckinPage from "./pages/CheckinPage";
import VisitasPage from "./pages/VisitasPage"
import NotFoundPage from "./pages/NotFoundPage";
import StatsVisitas from "./components/visita/StatsVisitas";
import PerfilPage from "./pages/PerfilPage";
import Logout from "./components/Logout";
import RutinasPage from "./pages/RutinasPage"


function AppRoutes() {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}> 
          <Route element={<ContainerLayout/>}>
            <Route path="/checkin" element={<CheckinPage />} />
            <Route path="/visitas" element={<VisitasPage />} />

            <Route path="/rutinas" element={<RutinasPage />} />
            
            <Route path="/stats" element={<StatsVisitas />} />
            <Route path="/perfil" element={<PerfilPage />} />
            
            <Route path="/logout" element={<Logout />} />
          </Route>
       </Route> 

      <Route path="*" element={<NotFoundPage />} />
      

    </Routes>
  );
}

export default AppRoutes;
