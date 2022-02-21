import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UPDATE_IP } from "../../constants/RouteConstants";
import Button from "./Button";

const tableHeaders = ["Id", "IP Address", "Label", "Action"];

const Table = ({ ipAdds, isLoggedIn }) => {
  const navigate = useNavigate();
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
                    <Button
                      cb={() => navigate(UPDATE_IP)}
                      disabled={!isLoggedIn}
                      className={`btn btn-sm btn-edit`}
                      text={`Edit`}
                    />
                    <Button
                      cb={() => navigate(UPDATE_IP)}                      
                      className={`btn btn-sm btn-logs`}
                      text={`Logs`}
                    />
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
