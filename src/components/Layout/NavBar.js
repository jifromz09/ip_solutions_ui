import React, { useEffect, useContext } from "react";
import {
  ADDRESSES,
  REGISTER,
  LOGIN,
  USER_ACTIVITY_LOGS,
  USER_AUDIT_TRAILS,
} from "../../constants/RouteConstants";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../data/api";
import { hideErrorAlert, setAlertErrorConfig } from "../../Helpers";
import useSessionStorage from "../../customHooks/useSessionStorage";
import { ALERT_SUCCESSS } from "../../constants/AlertMessages";
import { AppContext } from "../../appcontext";

const unAuthRoutes = [
  { label: "IP List", route: ADDRESSES },
  { label: "Login", route: LOGIN },
  { label: "Register", route: REGISTER },
];

const authRoutes = [
  { label: " User Activity logs", route: USER_ACTIVITY_LOGS },
  { label: "User Audit trails", route: USER_AUDIT_TRAILS },
  { label: "IP List", route: ADDRESSES },
];

const NavBar = () => {
  const { tokenData, userData, clearCredentials } = useSessionStorage();
  const { setAlertConfig } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(hideErrorAlert);
    };
  }, []);

  const onLogoutUser = async () => {
    await logout()
      .then((res) => {
        const { message } = res.data;
        clearCredentials();
        setAlertErrorConfig({
          message: message,
          show: true,
          classname: ALERT_SUCCESSS,
        }, setAlertConfig);
        navigate(LOGIN);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <nav className="navbar ">
      <Link className="navbar-brand" to={ADDRESSES}>
        <strong style={{ color: "#ffffff", fontSize: "18px" }}>
          IP Management Solutions
        </strong>
      </Link>

      {tokenData && (
        <ul className="nav justify-content-center">
          <div className="nav-item">
            <div className="row mx-auto">
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
              <div className="col g-0 d-flex justify-content-center align-items-start">
                <li className="nav-item dropdown">
                  <a
                    style={{ color: "#ffffff" }}
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    {userData}
                  </a>
                  <ul className="dropdown-menu">
                    {authRoutes.map((route) => {
                      <li>
                        <Link to={route.map} className="dropdown-item">
                          {route.label}
                        </Link>
                      </li>;
                    })}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <span
                        onClick={() => onLogoutUser()}
                        className="dropdown-item"
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </li>
              </div>
            </div>
          </div>
        </ul>
      )}
      {!tokenData && (
        <ul className="nav justify-content-center">
          {unAuthRoutes.map((route) => {
            return (
              <li className="nav-item" key={route.label}>
                <div className="row mx-auto">
                  <Link className="navbar-brand" to={route.route}>
                    <strong style={{ color: "#ffffff", fontSize: "12px" }}>
                      {`${route.label}`}
                    </strong>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
