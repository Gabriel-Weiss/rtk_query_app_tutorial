import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

const RequireAuth = () => {
  const { isAdmin } = useAuthentication();
  const location = useLocation();

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
