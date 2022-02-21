import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./_base/Button";
import TextInput from "./_base/TextInput";
import Layout from "./Layout/Layout";
import storage from "../config";
import Cookies from "js-cookie";
import { authHeader, hideErrorAlert, authSuccessTimeeOut } from "../Helpers";
import { register } from "../data/api";
import { LOGIN } from "../constants/RouteConstants";
import axios from "axios";
import Alert from "../../src/components/_base/Alert";

const EMAIL_REQUIRED = "Email is required!";
const PASSWORD_REQUIRED = "Password is required!";
const RETYPE_PASSWORD_REQUIRED = "Password did not match!";
const NAME_REQUIRED = "Name is required!";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(EMAIL_REQUIRED);
  const [alertClassName, setAlertClassName] = useState("alert-danger");

  useEffect(() => {
    return () => {
      clearTimeout(hideErrorAlert);
      clearTimeout(authSuccessTimeeOut);
    };
  }, []);

  const onTextChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case "name":
        setName((prevState) => (prevState = value));
        break;
      case "email":
        setEmail((prevState) => (prevState = value));
        break;
      case "password":
        setPassword((prevState) => (prevState = value));
        break;
      case "re-password":
        setpassword_confirmation((prevState) => (prevState = value));
        break;
      default:
        break;
    }
  };

  const registerUser = async () => {
    if (!name) {
      setShowErrorAlert((prevState) => (prevState = true));
      setAlertMessage((prevState) => (prevState = NAME_REQUIRED));
      hideErrorAlert(setShowErrorAlert);
      return;
    }

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

    if (!password_confirmation || password_confirmation !== password) {
      setShowErrorAlert((prevState) => (prevState = true));
      setAlertMessage((prevState) => (prevState = RETYPE_PASSWORD_REQUIRED));
      hideErrorAlert(setShowErrorAlert);
      return;
    }

    setLoading((prevState) => !prevState);
    await register({ email, password, password_confirmation, name })
      .then((res) => {
        const { access_token, name } = res.data.data;
        const {  message } = res.data;
        storage.setAccessToken(JSON.stringify(access_token));
        storage.setName(name);
        storage.setTokenExpiry("", Date.now() + 86400000);
        Cookies.set("token", access_token);
        axios.defaults.headers = authHeader();
        setLoading((prevState) => !prevState);
        setResponseResult(message, "alert-success");
      })
      .catch((err) => {
        console.log(err.response);
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
    authSuccessTimeeOut(navigate)
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <form style={{ width: "23rem" }}>
            <h1
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px", color: "#0097a7", fontWeight: "400" }}
            >
              Register
            </h1>

            <div className="form-outline mb-4">
              <TextInput
                type="text"
                className="form-control"
                value={name}
                cb={(e) => onTextChange(e, "name")}
                ph={`Name`}
              />
            </div>

            <div className="form-outline mb-4">
              <TextInput
                type="email"
                className="form-control"
                value={email}
                cb={(e) => onTextChange(e, "email")}
                ph={`Email`}
              />
            </div>

            <div className="form-outline mb-4">
              <TextInput
                type="password"
                className="form-control"
                value={password}
                cb={(e) => onTextChange(e, "password")}
                ph={`Password`}
              />
            </div>

            <div className="form-outline mb-4">
              <TextInput
                type="password"
                className="form-control"
                value={password_confirmation}
                cb={(e) => onTextChange(e, "re-password")}
                ph={`Retype Password`}
              />
            </div>

            <div className="pt-1 mb-4">
              <Button
                className={`btn btn-add btn-sm btn-block`}
                text={`Register`}
                cb={registerUser}                
              />
              <Button
                className={`btn btn-add btn-sm btn-block ml`}
                text={`Back to login`}
                cb={() => navigate(LOGIN)}                
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

export default Register;
