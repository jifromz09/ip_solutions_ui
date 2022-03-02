import React from "react";
import NavBar from "./NavBar";
 
const Layout = ({ children }) => {
   
  return (
    <div className="wrapper">
      <div className="container">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
