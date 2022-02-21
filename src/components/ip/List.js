import React, { useEffect, useState } from "react";
import "../../App.css";
import { colors } from "../../data";
import Table from "../_base/Table";
import Loader from "../_base/Loader";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SAVE_IP } from "../../constants/RouteConstants";
import Button from "../_base/Button";
import storage from "../../config";

const loaderCaption = "loading...";

const List = () => {
  const [ipAdds, loading] = useOutletContext();
  const navigate = useNavigate();
  const [isLoggedIn, settIsLoggedIn] = useState(storage.isLoggedIn());
  useEffect(() => {
    console.log(storage.isLoggedIn());
  }, []);
  return (
    <>
      <div className="row px-2">
        {loading ? (
          <div className="col">
            <Loader caption={loaderCaption} />
          </div>
        ) : (
          <div className="col">
            <Table ipAdds={ipAdds} isLoggedIn={isLoggedIn} />
            <div className="col button-container">
              <Button
                cb={() => navigate(SAVE_IP)}
                disabled={!isLoggedIn}
                className={`btn btn-sm btn-edit`}
                text={`Add`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
