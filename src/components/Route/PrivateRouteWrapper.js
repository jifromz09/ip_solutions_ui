import { Navigate } from "react-router-dom";
import storage from "../../config";
import { LOGIN } from "../../constants/RouteConstants";

const PrivateRouteWrapper = ({ children }) => {
  const isAuthenticated = storage.isLoggedIn();
  return isAuthenticated ? children : <Navigate to={LOGIN} />;
};

export default PrivateRouteWrapper;
