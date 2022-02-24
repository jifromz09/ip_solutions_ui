import React, { useEffect, useRef, useState, useContext } from "react";
import "../../App.css";

import { useLocation, Link } from "react-router-dom";
import { geIPAuditTrails } from "../../data/api";

import Pagination from "../_base/Pagination";
import NoDataFound from "../_base/Table/NoDataFound";
import Loader from "../_base/Loader";

import { formatDate } from "../../Helpers";
import { ADDRESSES } from "../../constants/RouteConstants";
import { ipAuditLogsTableHeader } from "../../data/static/tableHeader";
import Table from "../_base/Table/Table";
import isEmpty from "lodash/isEmpty";
 
const LOADER_CAPTION = "Fetching audit logs...";

const IPAuditLogs = () => {
  const { state } = useLocation();
  const { id } = state;

  const isMounted = useRef(false);

  const [ loading, setLoading ] = useState(false);

  const [audits, setAudits] = useState([]);

  useEffect(() => {
    isMounted.current = true;
    setLoading(prevState => prevState = true);
    fetchIPAuditTrails(null);
    return () => (isMounted.current = false);
  }, []);

  const fetchIPAuditTrails = async (queryString) => {
    await geIPAuditTrails({ id, queryString })
      .then((res) => {
        setAudits((prevState) => (prevState = res.data));
        setLoading((prevState) => (prevState = false));
      })
      .catch((err) => {
        setLoading((prevState) => !prevState);
      });
  };

  const mapValues = ({ event, new_values, old_values }, field) => {
    old_values = JSON.parse(old_values);
    new_values = JSON.parse(new_values);

    let retval = {
      oldValue: "",
      newValue: "",
    };

    if (event === "created") {
      retval.newValue = new_values[field];
      return retval;
    }

    retval.oldValue = old_values[field];
    retval.newValue = new_values[field];

    return retval;
  };

  const renderRows = () => {
    return (
      audits.data &&
      audits.data.map((item, i) => {
        return (
          <tr key={i}>
            <th scope="row">
              <small>{item.id}</small>
            </th>
            <td>
              <small>{item.user_id}</small>
            </td>
            <td>
              <small>{item.event}</small>
            </td>
            <td>
              <small>{mapValues(item, "ip_address").oldValue}</small>
            </td>
            <td>
              <small>{mapValues(item, "ip_address").newValue}</small>
            </td>
            <td>
              <small>{mapValues(item, "label").oldValue}</small>
            </td>
            <td>
              <small>{mapValues(item, "label").newValue}</small>
            </td>
            <td>
              <small>{formatDate(item.updated_at)}</small>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <div
      className={`row px-2 justify-content-center  
      ${loading ? "align-items-center" : "align-items-start"}
           h-100`}
    >
      <div className="col">

        {loading && <Loader caption={LOADER_CAPTION} show={true} />}

        {!loading && (
          <div className="row px-3">
            <h2 className="mb-3 pt-3 subHeader">I.P. Audit Logs</h2>
            <Table header={ipAuditLogsTableHeader}>
              {!isEmpty(audits) && <tbody>{audits && renderRows()}</tbody>}
            </Table>
            {isEmpty(audits) && <NoDataFound />}
            {!isEmpty(audits) && (
              <div className="row button-container">
                <div className="col">
                  <Link
                    className="btn btn-secondary ms-2 btn-sm"
                    to={ADDRESSES}
                  >
                    Back to list
                  </Link>
                </div>
                <div className="col">
                  <Pagination pageData={audits} cb={fetchIPAuditTrails} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IPAuditLogs;
