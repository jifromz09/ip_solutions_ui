import axios from "axios";
import {
  IP_LIST,
  SAVE_IP,
  LOGIN,
  REGISTER,
  LOGOUT,
  UPDATE_IP,
  USER_LOGS,
  AUDIT_TRAILS,
} from "../constants/ApiConstants";

 
export const getIPAddresses = async (queryString) => {
  const url = queryString ?? IP_LIST;
  const { data: response } = await axios.get(url);
  return response;
};

export const getUserLogs = async (queryString) => {
  const url = queryString ?? USER_LOGS;
  const { data: response } = await axios.get(
    url,
    { headers: authHeader() }
  );
  return response;
};
export const getUserAuditTrails = async (queryString) => {
  const url = queryString ?? AUDIT_TRAILS;
  const { data: response } = await axios.get(
    url,
    { headers: authHeader() }
  );
  return response;
};

 

export const saveIPAdress = async (data) => {
  const { label, ip_address } = data;
  return await axios.post(
    SAVE_IP,
    { label, ip_address },
    { headers: authHeader() }
  );
};

export const updateIPLabel = async (label, id) => {
  return await axios.put(
    `${UPDATE_IP}/${id}`,
    { label },
    { headers: authHeader() }
  );
};

export const login = async ({ email, password }) => {
  return await axios.post(LOGIN, { email, password });
};

export const register = async ({
  email,
  password,
  password_confirmation,
  name,
  type = 2,
}) => {
  return await axios.post(REGISTER, {
    email,
    password,
    password_confirmation,
    name,
    type,
  });
};

export const logout = async () => {
  return await axios.post(LOGOUT, {}, { headers: authHeader() });
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
