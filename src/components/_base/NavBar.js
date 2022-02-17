import React from "react";
import { ADDRESSES } from "../../constants/RouteConstants";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={ADDRESSES}>
          <strong style={{ color: "#ffffff", fontSize: "18px" }}>
            IP Management Solutions
          </strong>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
