import React, { useContext } from "react";
import "../../App.css";
import Loader from "../_base/Loader";
import { useNavigate, Link } from "react-router-dom";
import { SAVE_IP } from "../../constants/RouteConstants";
import Button from "../_base/Button";
import { AppContext } from "../Main";
import Table from "../_base/Table/Table";
import Pagination from "../_base/Pagination";
import NoDataFound from "../_base/Table/NoDataFound";
import { isEmpty } from "lodash";
import IPListTableBody from "./IPListTableBody";
import { ipListTableHeader } from "../../data/static/tableHeader";

const LOADER_CAPTION = "Fetching IP addresses...";

const IPList = () => {
  const navigate = useNavigate();
  const { ipAdds, loading, isLoggedIn, queryIPs } = useContext(AppContext);

  return (
    <div
      className={`row px-2 justify-content-center ${
        loading ? "align-items-center" : "align-items-start"
      } h-100`}
    >
      <div className="col">
        {loading && <Loader caption={LOADER_CAPTION} show={true} />}

        {!loading && (
          <div className="row px-3">
            <h2 className="mb-3 pt-3 subHeader">IP Address List</h2>

            {/* <div className="col button-container">
              <Button
                cb={() => navigate(SAVE_IP)}
                disabled={!isLoggedIn}
                className={`btn-primary btn-sm`}
                text={`Add new`}
              />
            </div> */}
            <Table header={ipListTableHeader}>
              {!isEmpty(ipAdds.data) && (
                <IPListTableBody ipAdds={ipAdds.data} isLoggedIn={isLoggedIn} />
              )}
            </Table>
            {isEmpty(ipAdds.data) && <NoDataFound />}
            {!isEmpty(ipAdds.data) && (
              <div className="row button-container">
                <div className="col">
                  <Button
                    cb={() => navigate(SAVE_IP)}
                    disabled={!isLoggedIn}
                    className={`btn-primary btn-sm`}
                    text={`Add new`}
                  />
                </div>
                <div className="col">
                  <Pagination pageData={ipAdds} cb={queryIPs} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IPList;
