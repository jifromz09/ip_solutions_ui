import React from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
 
const Home = () => {
  return (
    <div className="Home">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
