import React from "react";
import { Outlet } from "react-router-dom";
import { LOGIN } from "../../constants/RouteConstants";
import { Navigate } from "react-router-dom";
import useLocalStorage from "../../customHooks/useSessionStorage";

const PrivateRoute = () => {
  const { tokenData } = useLocalStorage();
  return !tokenData ? <Navigate to={LOGIN} replace /> : <Outlet />;
};

export default PrivateRoute;
