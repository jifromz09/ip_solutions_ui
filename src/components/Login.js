import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <form style={{ width: "23rem" }}>
          <h1 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
            Log in
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

          <div className="pt-1 mb-4">
            <Link className="btn btn-info btn-lg btn-block"
            to="/ipaddress"
            >Login</Link>
          </div>

          <p className="small mb-5 pb-lg-2">
            <a className="text-muted" href="#!">
              Forgot password?
            </a>
          </p>
          <p>
            Don't have an account?
            <Link className="link-info" to="/register">
              Register here
            </Link>
            {/* <a href="#!" className="link-info">
                Register here
              </a> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
