 
export const hideErrorAlert = (callBack) => {
  setTimeout(() => {
    callBack((prevState) => (prevState = false));
  }, 1200);
};

export const authSuccessTimeeOut = (cb, route) => {
  setTimeout(() => {
    cb(route);
  }, 1500);
};

 