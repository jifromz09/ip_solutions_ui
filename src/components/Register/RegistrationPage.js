import React, { useState, useEffect, useContext } from "react";
import Layout from "../Layout/Layout";

import { register } from "../../data/api";
import useSessionStorage from "../../customHooks/useSessionStorage";

import Alert from "../_base/Alert";
import { AppContext } from "../../appcontext";

import RegistrationForm from "./RegistrationForm";
import { ALERT_DANGER, ALERT_SUCCESSS } from "../../constants/AlertMessages";
import { setAlertErrorConfig, hideErrorAlert } from "../../Helpers";

import { ADDRESSES } from "../../constants/RouteConstants";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const { fetching, setFetching, setAlertConfig, alertConfig } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const userStorage = useSessionStorage();
  const tokenStorage = useSessionStorage();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      clearTimeout(hideErrorAlert);
    };
  }, []);

  const onTextChange = (e) => {
    const { value, name } = e.target;

    setUserDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const registerUser = async () => {
    if (
      userDetails.password &&
      userDetails.password_confirmation &&
      userDetails.password !== userDetails.password_confirmation
    ) {
      setAlertErrorConfig(
        {
          message: "Password did not match.",
          show: true,
          classname: ALERT_DANGER,
        },
        setAlertConfig
      );
      return;
    }

    setErrors((prevState) => (prevState = {}));
    setFetching((prevState) => !prevState);

    const { name, email, password, password_confirmation } = userDetails;

    await register({ email, password, password_confirmation, name })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const { message, name, access_token } = data;
          userStorage.setData("name", name);
          tokenStorage.setData("token", access_token);
          setFetching((prevState) => (prevState = false));
          setAlertErrorConfig(
            {
              message: message,
              show: true,
              classname: ALERT_SUCCESSS,
            },
            setAlertConfig
          );
          navigate(ADDRESSES);
        }
      })
      .catch((err) => {
        const { data, status } = err.response;
        setFetching((prevState) => (prevState = false));

        if (status === 422) {
          setErrors((prevState) => (prevState = { ...data?.errors }));
        }

        if (status === 404) {
          const { error: message } = data?.data;
          setAlertErrorConfig(
            {
              message: message,
              show: true,
              classname: ALERT_DANGER,
            },
            setAlertConfig
          );
        }
      });
  };

  return (
    <Layout>
      <div
        className={`container-fluid 
        align-items-center 
        justify-content-center row`}
      >
        <div className="col-md-5">
          <h1 className="fw-normal">Register</h1>
          <Alert {...alertConfig} />
          <RegistrationForm
            onTextChange={onTextChange}
            userDetails={userDetails}
            registerUser={registerUser}
            fetching={fetching}
            errors={errors}
          />
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;
