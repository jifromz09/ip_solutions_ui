import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext(null);

export const ContextWrapper = (props) => {
  const [fetching, setFetching] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    message: null,
    classname: null
  });
 
  const data = {
    fetching,
    setFetching,
    alertConfig,
    setAlertConfig
  };

  return (
    <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
  );
};
