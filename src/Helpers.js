 
import moment from "moment";
export const hideErrorAlert = (callBack) => {
  setTimeout(() => {
    callBack((prevState) => (prevState = false));
  }, 1200);
};

export const authSuccessTimeeOut = (cb, route) => {
  setTimeout(() => {
    cb(route);
  }, 0);
};

export const formatDate = (date) => {
  return moment(date).format("MMM DD, YY, h:mm:ss a");
};

 