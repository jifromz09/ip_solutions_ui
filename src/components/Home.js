import React from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
import List from "../components/ip/List";

const Home = () => {
  return (
    <div className="Home">
      <div className="container">
        <List />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
