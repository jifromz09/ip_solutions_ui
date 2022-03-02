import React from "react";
import { Outlet } from "react-router-dom";
import { LOGIN } from "../../constants/RouteConstants";
import { Navigate } from "react-router-dom";
import useSessionStorage from "../../customHooks/useSessionStorage";

const PrivateRoute = () => {
  const { tokenData } = useSessionStorage();
  return !tokenData ? <Navigate to={LOGIN} replace /> : <Outlet />;
};

export default PrivateRoute;
