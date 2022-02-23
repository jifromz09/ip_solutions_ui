import React, { useEffect, useContext } from "react";
import "../../App.css";
import Loader from "../_base/Loader";
import { useNavigate } from "react-router-dom";
import { SAVE_IP } from "../../constants/RouteConstants";
import Button from "../_base/Button";
import { AppContext } from "../Main";
import IPListTableBody from "./IPListTableBody";
import { ipListTableHeader } from "../../data/static/tableHeader";
import Pagination from "../_base/Pagination";
const LOADER_CAPTION = "Loading data...";

const IPList = () => {
  const navigate = useNavigate();
  const { ipAdds, loading, isLoggedIn, queryIPs } = useContext(AppContext);

  return (
    <div
      className={`row px-2 justify-content-center ${
        loading ? "align-items-center" : "align-items-start"
      } h-100`}
    >
      {loading ? (
        <div className="col">
          <Loader caption={LOADER_CAPTION} show={true} />
        </div>
      ) : (
        <div className="col">
          <h2 className="mb-3 pt-3 subHeader">IP Address List</h2>
          <div className="col button-container">
            <Button
              cb={() => navigate(SAVE_IP)}
              disabled={!isLoggedIn}
              className={`btn btn-sm btn-edit`}
              text={`Add new`}
            />
          </div>
          <table className="table table-striped table-sm table-bordered">
            <thead>
              <tr>
                {ipListTableHeader.map((thead, i) => {
                  return (
                    <th
                      className={`${thead === "Action" ? "thead-action" : ""}`}
                      scope="col"
                      key={thead}
                    >
                      {thead}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ipAdds ? (
                <IPListTableBody ipAdds={ipAdds.data} isLoggedIn={isLoggedIn} />
              ) : (
                <div>No data found!</div>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-center align-items-center mt-3 pagination">
            <nav aria-label="Page navigation">
              <Pagination pageData={ipAdds} cb={queryIPs} />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPList;
