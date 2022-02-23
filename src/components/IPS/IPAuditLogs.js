import React from "react";
import "../../App.css";
import moment from "moment";
import { useLocation, Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import Layout from "../Layout/Layout";
import { ADDRESSES } from "../../constants/RouteConstants";
import { ipAudotLogsTableHeader } from "../../data/static/tableHeader";

const IPAuditLogs = () => {
  const { state } = useLocation();
  const { audits } = state;

  const mapUpdatedValues = ({ event, new_values, old_values }) => {
    if (event === "created") {
      const { label, ip_address } = new_values;
      return { label, ip_address };
    }

    const { label, ip_address } = new_values;
    const labelOld = old_values.label;

    return { label, labelOld, ip_address };
  };

  return (
    <div
      className={`row px-2 justify-content-center  
             "align-items-start"
           h-100`}
    >
      <div className="col">
        <h2 className="mb-3 pt-3 subHeader">I.P. Audit Logs</h2>
        <table className="table table-striped table-sm table-bordered">
          <thead>
            <tr>
              {ipAudotLogsTableHeader.map((thead, i) => {
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
            {audits &&
              audits.map((item, i) => {
                const updated_at = moment(item.updated_at).format(
                  "MMM DD, YY, h:mm:ss a"
                );
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
                      <small>
                        {item.event === "created"
                          ? "---"
                          : mapUpdatedValues(item).ip_address || "---"}
                      </small>
                    </td>
                    <td>
                      <small>
                        {mapUpdatedValues(item).ip_address || "---"}
                      </small>
                    </td>
                    <td>
                      <small>
                        {item.event === "created"
                          ? "---"
                          : mapUpdatedValues(item).labelOld || "---"}
                      </small>
                    </td>
                    <td>
                      {" "}
                      <small>{mapUpdatedValues(item).label || "---"} </small>
                    </td>
                    <td>
                      {" "}
                      <small>{updated_at} </small>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="col button-container">
          <Link className="btn btn-secondary ms-2 btn-sm" to={ADDRESSES}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IPAuditLogs;
