import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUser } from "../../redux/auth/authSlice";

const RequireAuth = () => {
  const user = useSelector(selectUser);
  const isAdmin = user?.username === "admin";

  const location = useLocation();

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
