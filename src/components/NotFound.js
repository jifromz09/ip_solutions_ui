import React from "react";
import Layout from "./Layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <h1
            className="fw-normal mb-3 pb-3"
            style={{ letterSpacing: "1px", color: "#0097a7" }}
          >
            404 - Page Not Found
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
