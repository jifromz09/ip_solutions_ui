import axios from "axios";
import { BASE_URL, IP_LIST, SAVE_IP, LOGIN, REGISTER } from "../constants/ApiConstants";

const fetch_ip = `${BASE_URL}/${IP_LIST}`;
const save_ip = `${BASE_URL}/${SAVE_IP}`;
const login_user = `${BASE_URL}/${LOGIN}`;
const register_user = `${BASE_URL}/${REGISTER}`;

export const getIPAddresses = async () => {
  const { data: response } = await axios.get(fetch_ip);
  return response;
};

export const saveIPAdress = async (data) => {
  const { label, ip_address } = data;
  return await axios.post(save_ip, { label, ip_address });
};

export const login = async ({email, password}) => {
  return await axios.post(login_user, {email, password});
};

export const register = async ({email, password, password_confirmation, name, type= 2}) => {
  return await axios.post(register_user, {email, password, password_confirmation, name, type });
};
