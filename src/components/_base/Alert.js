import React from "react";

const Alert = ({ message, classname, show }) => {
  return (
    <div
      className={`alert
      ${classname} fade ${
        show ? "show" : "hide"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
