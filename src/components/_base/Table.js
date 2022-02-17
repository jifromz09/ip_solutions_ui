import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UPDATE_IP } from "../../constants/RouteConstants";

const tableHeaders = ["Id", "IP Address", "Label", "Action"];

const Table = ({ ipAdds }) => {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {tableHeaders.map((thead, i) => {
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
          {ipAdds &&
            ipAdds.map((item, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{item.id}</th>
                  <td>{item.ip_address}</td>
                  <td>{item.label}</td>
                  <td className="action-container">
                    <Link className="btn btn-sm btn-edit" to={UPDATE_IP}>
                      Edit
                    </Link>
                    <Link className="btn btn-sm btn-logs" to={UPDATE_IP}>
                      Logs
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
