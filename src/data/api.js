import axios from "axios";
import {
  BASE_URL,
  IP_LIST,
  SAVE_IP,
  LOGIN,
  REGISTER,
  LOGOUT,
} from "../constants/ApiConstants";

const fetch_ip = `${BASE_URL}/${IP_LIST}`;
const save_ip = `${BASE_URL}/${SAVE_IP}`;
const login_user = `${BASE_URL}/${LOGIN}`;
const register_user = `${BASE_URL}/${REGISTER}`;
const logout_user = `${BASE_URL}/${LOGOUT}`;

export const getIPAddresses = async () => {
  const { data: response } = await axios.get(fetch_ip);
  return response;
};

export const saveIPAdress = async (data) => {
  const { label, ip_address } = data;
  return await axios.post(save_ip, { label, ip_address });
};

export const login = async ({ email, password }) => {
  return await axios.post(login_user, { email, password });
};

export const register = async ({
  email,
  password,
  password_confirmation,
  name,
  type = 2,
}) => {
  return await axios.post(register_user, {
    email,
    password,
    password_confirmation,
    name,
    type,
  });
};

export const logout = async () => {
  console.log(authHeader());
  return await axios.post(logout_user, {}, { headers: authHeader() });
};

export const authHeader = () => {
  // let user = JSON.parse(localStorage.getItem('user'));
  let token = JSON.parse(localStorage.getItem("access_token"));

  if (token) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  } else {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
};
