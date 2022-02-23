import React from "react";
import NavBar from "../_base/NavBar";
import storage from "../../config";

const Layout = ({ children }) => {
  return (
    <div className="Wrapper overflow-scroll">
      <div className="container">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
