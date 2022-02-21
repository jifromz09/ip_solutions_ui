import React, { useEffect, useState } from "react";
import { ADDRESSES, REGISTER, LOGIN } from "../../constants/RouteConstants";
import { Link, useNavigate } from "react-router-dom";
import storage from "../../config";
import { logout } from "../../data/api";
import { authSuccessTimeeOut, hideErrorAlert } from "../../Helpers";
import Cookies from "js-cookie";

const NavBar = () => {
  const name = storage.getItem("name");
  const isLoggedIn = storage.isLoggedIn();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("alert-danger");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(hideErrorAlert);
      clearTimeout(authSuccessTimeeOut);
    };
  }, []);

  const onLogoutUser = async () => {
    await logout()
      .then((res) => {
        console.log(res);
        const { message } = res.data;
        storage.clear();
        Cookies.remove("token");
        setResponseResult(message, "alert-success");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const setResponseResult = (message, className) => {
    setAlertClassName((prevState) => (prevState = className));
    setAlertMessage((prevState) => (prevState = message));
    setShowErrorAlert((prevState) => (prevState = true));
    hideErrorAlert(setShowErrorAlert);
    authSuccessTimeeOut(navigate, LOGIN);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={ADDRESSES}>
          <strong style={{ color: "#ffffff", fontSize: "18px" }}>
            IP Management Solutions
          </strong>
        </Link>
        <ul className="nav justify-content-center">
          {isLoggedIn && (
            <li className="nav-item">
              <div className="row">
                <div className="col g-0 d-flex justify-content-center">
                  <a className="navbar-brand" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ionicon"
                      viewBox="0 0 512 512"
                      width="50px"
                      height="50px"
                    >
                      <title>Person Circle</title>
                      <path
                        fill="#ffffff"
                        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z"
                      />
                    </svg>
                  </a>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="col d-flex justify-content-end">
                    <strong style={{ color: "#ffffff", fontSize: "12px" }}>
                      {`${name}!`}
                    </strong>
                  </div>
                  <div className="col d-flex justify-content-start">
                    <strong
                      style={{
                        color: "#ffffff",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onLogoutUser();
                      }}
                    >
                      {`Logout`}
                    </strong>
                  </div>
                </div>
              </div>
            </li>
          )}
          {!isLoggedIn && (
            <li className="nav-item">
              <Link className="navbar-brand" to={ADDRESSES}>
                <strong style={{ color: "#ffffff", fontSize: "12px" }}>
                  IP List
                </strong>
              </Link>
            </li>
          )}
          
          {!isLoggedIn && (
            <li className="nav-item px-2">
              <Link className="navbar-brand" to={LOGIN}>
                <strong style={{ color: "#ffffff", fontSize: "12px" }}>
                  Login
                </strong>
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className="nav-item">
              <Link className="navbar-brand" to={REGISTER}>
                <strong style={{ color: "#ffffff", fontSize: "12px" }}>
                  Register
                </strong>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
