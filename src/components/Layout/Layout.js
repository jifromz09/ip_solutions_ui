import React, { useState } from "react";
import NavBar from "../_base/NavBar";


const Layout = ({ children }) => {
  
  return (
    <div className="Wrapper">
      <div className="container">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
