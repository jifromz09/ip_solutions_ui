import React from "react";
import "../../App.css";
import Loader from "../_base/Loader";
import { useNavigate } from "react-router-dom";
import { SAVE_IP } from "../../constants/RouteConstants";
import Button from "../_base/Button";
import Table from "../_base/Table/Table";
import Pagination from "../_base/Pagination";
import NoDataFound from "../_base/Table/NoDataFound";
import { isEmpty } from "lodash";
import IPListTableBody from "./IPListTableBody";
import { ipListTableHeader } from "../../data/static/tableHeader";
import { AppContext } from "../../appcontext";
import useSessionStorage from "../../customHooks/useSessionStorage";
import { getIPAddresses} from '../../data/api';

const {useContext, useState, useEffect, useRef} = React;

const LOADER_CAPTION = "Fetching IP addresses...";

const IPListPage = () => {
  const navigate = useNavigate();
  const { fetching, setFetching } =
  useContext(AppContext);
  const [ipAddresses, setIPAddresses] = useState([]);

  const { tokenData } = useSessionStorage();
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
     
    queryIPs(null);
    return () => (isMounted.current = false);
  }, [window.location.key]);

  const queryIPs = async (query) => {
    setFetching((prevState) => prevState = true);
    const { data } = await getIPAddresses(query);
    if (!isMounted.current) return;
    setIPAddresses((prevState) => (prevState = data));
    setFetching((prevState) => prevState = false);
  };

  return (
    <div className={`container-fluid ${fetching ? "align-items-center row" : ""}`}>
      <div className="col">
        {fetching && <Loader caption={LOADER_CAPTION} show={true} />}

        {!fetching && (
          <div className="row px-3">
            <h2 className="mb-3 pt-3 subHeader">IP Address List</h2>
            <Table header={ipListTableHeader}>
              {!isEmpty(ipAddresses.data) && (
                <IPListTableBody ipAddresses={ipAddresses.data} tokenData={tokenData} />
              )}
            </Table>
            {isEmpty(ipAddresses.data) && !fetching && <NoDataFound />}
            {!isEmpty(ipAddresses.data) && (
              <div className="row button-container">
                <div className="col">
                  <Button
                    cb={() => navigate(SAVE_IP)}
                    disabled={!tokenData}
                    className={`btn-primary btn-sm`}
                    text={`Add new`}
                  />
                </div>
                <div className="col">
                  <Pagination pageData={ipAddresses} cb={queryIPs} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IPListPage;
