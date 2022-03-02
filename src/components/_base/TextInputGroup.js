import React from "react";

import isEmpty from "lodash/isEmpty";

const TextInputGroup = ({
  className = "",
  value = "",
  onTextChange,
  disabled = false,
  type = "text",
  errors,
  name,
  ...rest
}) => {
  const updateText = (e) => {
    onTextChange(e);
  };

  return (
    <div className={`form-outline ${isEmpty(errors) ? "mb-4" : "mb-2 "}`}>
      <input
        onChange={(e) => updateText(e)}
        type={type}
        className={`form-control ${className} ${
          !isEmpty(errors) && errors[name] ? "border border-2 border-danger" : ""
        }`}
        value={value}
        disabled={disabled}
        name={name}
        {...rest}
      />
      {!isEmpty(errors) && errors[name] && (
        <span className="error-message">{errors[name]}</span>
      )}
    </div>
  );
};

export default TextInputGroup;
