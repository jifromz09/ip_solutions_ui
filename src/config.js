 
const storage = {};

storage.setAccessToken = (token) => {
  localStorage.setItem("access_token", token);
};

storage.setName = (name) => {
  localStorage.setItem("name", name);
};

storage.setTokenExpiry = (expires_at) => {
  localStorage.setItem("expires_at", expires_at);
};

storage.getItem = (key) => {
  return localStorage.getItem(key);
};

storage.clear = () => {
  localStorage.clear();
};

export default storage;
