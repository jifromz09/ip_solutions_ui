import React from "react";

const Alert = ({ message, className, showErrorAlert }) => {
  return (
    <div
      className={`mt-3 alert ${className} fade ${
        showErrorAlert ? "show" : "hide"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
