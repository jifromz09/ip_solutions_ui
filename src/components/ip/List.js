import React from "react";
import "../../App.css";
import { colors } from "../../data";
import Table from "../_base/Table";
import Button from "../_base/Button";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <>
      <div className="row">
        <Table colors={colors} />
      </div>
      <div className="row">
        <div className="col button-container">
          <Link className="btn btn-primary" to={`/ip/add`}>
            Add
          </Link>
          <Link className="btn btn-primary ms-2" to={`/ip/add`}>
            Audit logs
          </Link>
        </div>
      </div>
    </>
  );
};

export default List;
