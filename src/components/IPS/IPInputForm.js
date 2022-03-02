import React from "react";
import { useNavigate } from "react-router-dom";
import { ADDRESSES } from "../../constants/RouteConstants";
import TextInputGroup from "../_base/TextInputGroup";
import Button from "../_base/Button";
import { isEmpty } from "lodash";

const IPInputForm = ({
  ipFieldData,
  fetching,
  onTextChange,
  onSave,
  errors,
}) => {
  const navigate = useNavigate();

  const { ip_address, label, id } = ipFieldData;

  return (
    <form className="mb-2">
      <TextInputGroup
        value={ip_address}
        placeholder={`IP Address`}
        disabled={id ? true : false}
        name={`ip_address`}
        errors={errors}
        onTextChange={onTextChange}
      />
      <TextInputGroup
        value={label}
        onTextChange={onTextChange}
        placeholder={`Label`}
        name={`label`}
        errors={errors}
      />
      <div className="d-grid gap-2 d-md-block">
        <Button
          disabled={fetching}
          className={`btn-primary btn-sm`}
          cb={() => {
            onSave();
          }}
          text={!id ? "Save" : "Update"}
        />
        <Button
          disabled={fetching}
          className={`btn-secondary btn-sm`}
          cb={() => {
            navigate(ADDRESSES);
          }}
          text={`Back to list`}
        />
      </div>
    </form>
  );
};

export default IPInputForm;
