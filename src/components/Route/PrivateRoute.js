import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import storage from "../../config";
import { LOGIN } from "../../constants/RouteConstants";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = storage.isLoggedIn();
  return isLoggedIn ? <Outlet /> : <Navigate to={LOGIN} replace />;
};

export default PrivateRoute;
