import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import VisitasLayout from "./layouts/VisitasLayout";
import CheckinPage from "./pages/CheckinPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Route>

      <Route element={<VisitasLayout />}>
        <Route path="/checkin" element={<CheckinPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
