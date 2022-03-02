import moment from "moment";
export const hideErrorAlert = (callBack) => {
  setTimeout(() => {
    callBack((prevState) => {
      return { ...prevState, show: false, classname: null, message: null };
    });
  }, 2000);
};

 
export const formatDate = (date) => {
  return moment(date).format("MMM DD, YY, h:mm:ss a");
};


export const setAlertErrorConfig = ({ message, classname, show }, callBack) => {
  callBack(
    (prevState) =>
      (prevState = {
        ...prevState,
        show,
        message,
        classname,
      })
  );
  hideErrorAlert(callBack);
};
