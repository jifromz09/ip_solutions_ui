import React from "react";

function TextInput({
  className,
  value = "",
  ph,
  cb,
  disabled = false,
  type = "text",
}) {
  const onTextChange = (e) => {
    cb(e);
  };
  return (
    <>
      <input
        onChange={(e) => onTextChange(e)}
        type={type}
        className={className}
        value={value}
        placeholder={ph}
        disabled={disabled}
      />
    </>
  );
}

export default TextInput;
