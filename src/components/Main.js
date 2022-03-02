import React from "react";
import "../App.css";

import Layout from "./Layout/Layout";
import PrivateRoute from "../components/Route/PrivateRoute";

const Main = () => {
  return (
    <Layout>
      <PrivateRoute />
    </Layout>
  );
};

export default Main;
