import { useState, useEffect, useMemo } from "react";
import { login } from "../../data/api";

export default function useUserLogin() {
  const [resultData, setResult] = useState({ data: null, status: null });

  const authResult = () => resultData;
  const userLogin = async (userCreds) => {
    const { email, password } = userCreds;
    const loginResult = await login({ email, password });

    // setResult((prevState) => {
    //   return {
    //     ...prevState,
    //     data: loginResult.data,
    //     status: loginResult.status,
    //   };
    // });
    // console.log(authResult);
    const { status, data } = loginResult;

    console.log(status == 200);

    if (status === 200) {
      const { success, message } = data;
      setResult((prevState) => {
        console.log(prevState);
        return {
          ...prevState,
          success: success,
          data: data,
          message: message,
          status: status,
        };
      });
    }

    if (status === 422) {
      setResult((prevState) => {
        return {
          ...prevState,
          status: status,
          data: data?.errors,
          success: false,
          message: data?.message,
        };
      });
      return;
    }

    if (status === 404) {
      const { error: message } = data?.data;
      setResult((prevState) => {
        return {
          ...prevState,
          message: message,
          data: data,
          status: status,
          success: false,
        };
      });
      return;
    }
  };

  return {
    userAuth: userLogin,
    authResult: authResult,
  };
}
