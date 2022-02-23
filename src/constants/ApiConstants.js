const BASE_URL = "http://localhost:8000/api";
const IP_LIST = `${BASE_URL}/ipaddress/addresses`;
const SAVE_IP = `${BASE_URL}/ipaddress/create`;
const UPDATE_IP = `${BASE_URL}/ipaddress/update`;
const LOGIN = `${BASE_URL}/login`;
const REGISTER = `${BASE_URL}/register`;
const LOGOUT = `${BASE_URL}/logout`;
const USER_ACTIVITIES = `${BASE_URL}/user/activities`;
const USER_LOGS = `${BASE_URL}/user/activities`;
const AUDIT_TRAILS = `${BASE_URL}/user/audit-trails`;

export { USER_LOGS, AUDIT_TRAILS, BASE_URL, IP_LIST, SAVE_IP, UPDATE_IP, LOGIN, REGISTER, LOGOUT, USER_ACTIVITIES };
