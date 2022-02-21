import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteWrapper = ({
  isAuthenticated,
  children: Component,
  redirectTo,
}) => {
  if (isAuthenticated) return <Component />;
  return <Navigate to={redirectTo} replace />;
};

export default PrivateRouteWrapper;
