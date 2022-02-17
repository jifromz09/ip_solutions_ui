import React, { useState } from "react";
import Button from "../_base/Button";
import { Link } from "react-router-dom";
import { ADDRESSES } from "../../constants/RouteConstants";
import TextInput from "../_base/TextInput";

const Add = () => {
  const [ipAddress, setIpAddress] = useState("");

  const onTextChange = (e) => {
    const { value } = e.target;
    setIpAddress((prevState) => (prevState = value));
  };

  return (
    <div className="row g-0">
      <div className="col p-4">
       
        <div className="input-group mb-3">
          <TextInput
            className={`form-control`}
            value={ipAddress}
            cb={onTextChange}
            ph={`IP Address`}
          />
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Label" />
        </div>
        <Button
          className={`btn-primary btn-sm`}
          cb={() => {
            console.log("test");
          }}
          text={`Save`}
        />
        <Link className="btn btn-secondary ms-2 btn-sm" to={ADDRESSES}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Add;
