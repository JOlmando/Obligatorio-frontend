import { Routes, Route } from "react-router";

import ContainerLayout from "./layouts/ContainerLayout"

import ProtectedRoute from './guards/ProtectedRoute'

import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CheckinPage from "./pages/CheckinPage";

import NotFoundPage from "./pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Route>
{/* 
      <Route element={<ProtectedRoute />}> */}
        <Route element={<ContainerLayout/>}>

          <Route path="/checkin" element={<CheckinPage />} />
          
        {/* </Route> */}
      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default AppRoutes;
