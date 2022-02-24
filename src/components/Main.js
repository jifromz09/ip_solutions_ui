import React, { useEffect, useState, useRef, createContext } from "react";
import "../App.css";
import { getIPAddresses } from "../data/api";
import {useLocation} from 'react-router-dom';

import Layout from "./Layout/Layout";
import storage from "../config";
import { hideErrorAlert } from "../Helpers";
import PrivateRoute from '../components/Route/PrivateRoute';

import { INVALID_IP_ADDRESS } from "../constants/AlertMessages";

export const AppContext = createContext(null);

const Provider = ({ children }) => {

  const isMounted = useRef(false);

  const [ipAdds, setIPAdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(storage.isLoggedIn());  
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(INVALID_IP_ADDRESS);
  const [alertClassName, setAlertClassName] = useState("alert-danger");
  const name = storage.getItem("name");
  const location = useLocation()

  useEffect(() => {
    isMounted.current = true;
     
    queryIPs(null);
    return () => (isMounted.current = false);
  }, [location.key]);

  const queryIPs = async (query) => {
    const { data } = await getIPAddresses(query);
    if (!isMounted.current) return;
    setIPAdds((prevState) => (prevState = data));
    setLoading((prevState) => prevState = false);
  };
 
  const setResponseResult = (message, className) => {
    setAlertClassName((prevState) => (prevState = className));
    setAlertMessage((prevState) => (prevState = message));
    setShowErrorAlert((prevState) => (prevState = true));
    setLoading((prevState) => !prevState);
    hideErrorAlert(setShowErrorAlert);
  };

  return (
    <AppContext.Provider
      value={{
        name,
        ipAdds,
        setIPAdds,
        loading,
        setLoading,
        isLoggedIn,
        showErrorAlert,
        setShowErrorAlert,
        alertMessage,
        setAlertMessage,
        alertClassName,
        setAlertClassName,
        setResponseResult,
        queryIPs
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const Main = () => {
  return (
    <Provider>
      <Layout>
        <PrivateRoute />
      </Layout>
    </Provider>
  );
};

export default Main;
