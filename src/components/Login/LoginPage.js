import React from "react";
import LoginForm from "./LoginForm";

import { ADDRESSES } from "../../constants/RouteConstants";
import Layout from "../Layout/Layout";
import { AppContext } from "../../appcontext";
import Alert from "../_base/Alert";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../../customHooks/useSessionStorage";
import { useEffect, useState, useContext } from "react";
import { ALERT_DANGER, ALERT_SUCCESSS } from "../../constants/AlertMessages";
import { login } from "../../data/api";
import { setAlertErrorConfig, hideErrorAlert } from "../../Helpers";

const LoginPage = () => {
  const { fetching, setFetching, setAlertConfig, alertConfig } =
    useContext(AppContext);

  const [userCreds, setUserCreds] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const userStorage = useSessionStorage();
  const tokenStorage = useSessionStorage();

  useEffect(() => {
    return () => {
      clearTimeout(hideErrorAlert);
    };
  }, []);

  const onTextChange = (e) => {
    const { value, name } = e.target;

    setUserCreds((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const userLogin = async () => {
    setErrors((prevState) => (prevState = {}));
    setFetching((prevState) => !prevState);

    const { email, password } = userCreds;

    await login({ email, password })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const { name, access_token } = data.data;

          console.log(data)

          userStorage.setData("name", name);
          tokenStorage.setData("access_token", access_token);
          setFetching((prevState) => (prevState = false));
          setAlertErrorConfig({
            message: data.message,
            show: true,
            classname: ALERT_SUCCESSS,
          }, setAlertConfig);
          navigate(ADDRESSES);
        }
      })
      .catch((err) => {

        console.log(err)

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
          <h1 className="fw-normal">Log in</h1>
          <Alert {...alertConfig} />
          <LoginForm
            onTextChange={onTextChange}
            userCreds={userCreds}
            userLogin={userLogin}
            fetching={fetching}
            errors={errors}
          />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
