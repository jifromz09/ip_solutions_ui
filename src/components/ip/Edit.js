import React, {useState} from "react";
import Button from "../_base/Button";
import { Link } from "react-router-dom";
import { ADDRESSES } from "../../constants/RouteConstants";
import TextInput from "../_base/TextInput";

const Edit = () => {

  const [label, setLabel] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const onLabelChange = (e) => {
    const { value } = e.target;
    setLabel((prevState) => (prevState = value));
  };

  return (
    <div className="row g-0">
    <div className="col p-4">
     
      <div className="input-group mb-3">
        <TextInput
          className={`form-control`}
          value={ipAddress}
          ph={`IP Address`}
          disabled={true}
        />
      </div>
      <div className="input-group mb-3">
      <TextInput
          className={`form-control`}
          value={label}
          cb={onLabelChange}
          ph={`IP Address`}
        />
      </div>
      <Button
        className={`btn-primary btn-sm`}
        cb={() => {
          console.log("test");
        }}
        text={`Update`}
      />
      <Link className="btn btn-secondary ms-2 btn-sm" to={ADDRESSES}>
        Back
      </Link>
    </div>
  </div>
  );
};

export default Edit;
