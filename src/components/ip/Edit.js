import React from "react";
import Button from "../_base/Button";
import { Link } from "react-router-dom";

const Edit = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="IP" />
          </div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Label" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col button-container">
          <Button
            className={`btn-primary ms-3`}
            cb={() => {
              console.log("test");
            }}
            text={`Update label`}
          />
          <Link className="btn btn-secondary ms-2" to={`/ip/list`}>
            Back to list
          </Link>
        </div>
      </div>
    </>
  );
};

export default Edit;
