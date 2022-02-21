import { ADDRESSES } from "./constants/RouteConstants";
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

export const hideErrorAlert = (callBack) => {
  setTimeout(() => {
    callBack((prevState) => (prevState = false));
  }, 1200);
};

export const authSuccessTimeeOut = (cb) => {
  setTimeout(() => {
    cb(ADDRESSES);
  }, 1500);
};
