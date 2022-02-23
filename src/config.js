import isEmpty from "lodash/isEmpty";

const storage = {
  setAccessToken: (token) => {
    localStorage.setItem("access_token", token);
  },

  setUserId: (userId) => {
    localStorage.setItem("userId", userId);
  },

  setName: (name) => {
    localStorage.setItem("name", name);
  },

  getName: () => {
    console.log(localStorage.getItem("name"));
  },

  setTokenExpiry: (expires_at) => {
    localStorage.setItem("expires_at", expires_at);
  },

  getItem: (key) => {
    return localStorage.getItem(key);
  },

  clear: () => {
    localStorage.clear();
  },

  isLoggedIn: () => {
    return isEmpty(JSON.parse(localStorage.getItem("access_token")))
      ? false
      : true;
  },
};

export default storage;
