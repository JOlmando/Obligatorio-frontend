import { Routes, Route } from "react-router";

import ContainerLayout from "./layouts/ContainerLayout"

import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


import VisitasLayout from "./layouts/VisitasLayout";
import CheckinPage from "./pages/CheckinPage";

import NotFoundPage from "./pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
        <Route element={<ContainerLayout.jsx />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Route>

        <Route element={<VisitasLayout />}>
          <Route path="/checkin" element={<CheckinPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
  );
}

export default AppRoutes;
