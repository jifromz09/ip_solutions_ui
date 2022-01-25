import React from "react";

function Button({ className, text, cb }) {
  const onClick = () => {
    cb();
  };
  return (
    <>
      <button
        type="button"
        className={`btn ${className}`}
        onClick={() => onClick()}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
