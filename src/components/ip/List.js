import React, { useEffect } from "react";
import "../../App.css";
import { colors } from "../../data";
import Table from "../_base/Table";
import Button from "../_base/Button";
import Loader from "../_base/Loader";
import { Link, useOutletContext } from "react-router-dom";
import { SAVE_IP } from "../../constants/RouteConstants";

const loaderCaption = "loading...";

const List = () => {
  const [ipAdds, loading] = useOutletContext();
  return (
    <>
      <div className="row px-2">
        {loading ? (
          <div className="col">
            <Loader caption={loaderCaption} />
          </div>
        ) : (
          <div className="col">
            <Table ipAdds={ipAdds} />
            <div className="col button-container">
              <Link className="btn btn-sm btn-add" to={SAVE_IP}>
                Add
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
