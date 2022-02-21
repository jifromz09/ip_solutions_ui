import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./_base/Button";
import TextInput from "./_base/TextInput";
import Layout from "./Layout/Layout";
import storage from "../config";
import Cookies from "js-cookie";
import { authHeader, hideErrorAlert, authSuccessTimeeOut } from "../Helpers";
import { login } from "../data/api";
import { REGISTER } from "../constants/RouteConstants";
import axios from "axios";
import Alert from "../../src/components/_base/Alert";

const EMAIL_REQUIRED = "Email is required!";
const PASSWORD_REQUIRED = "Password is required!";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(EMAIL_REQUIRED);
  const [alertClassName, setAlertClassName] = useState("alert-danger");

  useEffect(() => {
    return () => {
      clearTimeout(hideErrorAlert);
      clearTimeout(authSuccessTimeeOut);
    };
  }, []);

  const onEmailTextChange = (e) => {
    const { value } = e.target;
    setEmail((prevState) => (prevState = value));
  };

  const onPasswordTextChange = (e) => {
    const { value } = e.target;
    setPassword((prevState) => (prevState = value));
  };

  const userLogin = async () => {
    if (!email) {
      setShowErrorAlert((prevState) => (prevState = true));
      setAlertMessage((prevState) => (prevState = EMAIL_REQUIRED));
      hideErrorAlert(setShowErrorAlert);
      return;
    }

    if (!password) {
      setShowErrorAlert((prevState) => (prevState = true));
      setAlertMessage((prevState) => (prevState = PASSWORD_REQUIRED));
      hideErrorAlert(setShowErrorAlert);
      return;
    }

    setLoading((prevState) => !prevState);
    await login({ email, password })
      .then((res) => {
        const { access_token, name } = res.data.data;
        const { message } = res.data;
        storage.setAccessToken(JSON.stringify(access_token));
        storage.setName(name);
        storage.setTokenExpiry("", Date.now() + 86400000);
        Cookies.set("token", access_token);
        axios.defaults.headers = authHeader();
        setLoading((prevState) => !prevState);
        setResponseResult(message, "alert-success");
      })
      .catch((err) => {
        const { data, status } = err.response;
        const { message } = data;
        if (status === 404) {
          setResponseResult("Invalid username or password!!", "alert-danger");
        } else {
          setResponseResult(message, "alert-danger");
        }
        setLoading((prevState) => !prevState);
      });
  };

  const setResponseResult = (message, className) => {
    setAlertClassName((prevState) => (prevState = className));
    setAlertMessage((prevState) => (prevState = message));
    setShowErrorAlert((prevState) => (prevState = true));
    hideErrorAlert(setShowErrorAlert);
    authSuccessTimeeOut(navigate);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <form style={{ width: "23rem" }}>
            <h1
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px", color: "#0097a7" }}
            >
              Log in
            </h1>

            <div className="form-outline mb-4">
              <TextInput
                type="email"
                className="form-control form-control-lg"
                value={email}
                cb={onEmailTextChange}
                ph={`Email`}
              />
            </div>

            <div className="form-outline mb-4">
              <TextInput
                type="password"
                className="form-control form-control-lg"
                value={password}
                cb={onPasswordTextChange}
                ph={`Password`}
              />
            </div>

            <div className="pt-1 mb-4">
              <Button
                className={`btn btn-add btn-lg btn-block`}
                text={`Login`}
                cb={userLogin}
                disabled={loading}
              />
              <Button
                className={`btn btn-add btn-lg btn-block ml`}
                text={`Register`}
                cb={() => navigate(REGISTER)}
                disabled={loading}
              />
            </div>
            <Alert
              message={alertMessage}
              showErrorAlert={showErrorAlert}
              className={alertClassName}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
