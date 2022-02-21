import React from "react";

function Button({ className, text, cb, disabled = false }) {
  const onClick = () => {
    cb();
  };
  return (
    <>
      <button
        type="button"
        className={`btn ${className}`}
        onClick={() => onClick()}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
