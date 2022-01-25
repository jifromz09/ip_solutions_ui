import React from "react";
import "../../App.css";
import { colors } from "../../data";
import Table from "../_base/Table";
import Button from "../_base/Button";

const List = () => {
  return (
    <>
      <div className="row">
        <Table colors={colors} />
      </div>
      <div className="row">
        <div className="col button-container">
          <Button
            className={`btn-primary`}
            cb={() => {
              console.log("test");
            }}
            text={`Add`}
          />
         <Button
            className={`btn-primary ms-2`}
            cb={() => {
              console.log("test");
            }}
            text={`Audit logs`}
          />
        </div>
      </div>
    </>
  );
};

export default List;
