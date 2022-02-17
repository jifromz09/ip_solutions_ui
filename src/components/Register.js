import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="login-container col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <form style={{ width: "23rem" }}>
            <h1
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Register
            </h1>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example18"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="form2Example18">
                Email address
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example28"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="form2Example28">
                Password
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example28"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="form2Example28">
                Re-type password
              </label>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="button">
                Register
              </button>
            </div>

            <p className="small mb-5 pb-lg-2">
              <Link to="/" className="text-muted">
                Back to login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
