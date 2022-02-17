import React from "react";

function TextInput({ className, value = "", ph, cb, disabled = false }) {
  const onTextChange = (e) => {
    cb(e);
  };
  return (
    <>
      <input
        onChange={(e) => onTextChange(e)}
        type="text"
        className={className}
        value={value}
        placeholder={ph}
        disabled={disabled}
      />
    </>
  );
}

export default TextInput;
