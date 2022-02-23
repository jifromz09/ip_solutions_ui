import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { formatDate } from "../../Helpers";
import { userAuditTrailTableHeader } from "../../data/static/tableHeader";
import Pagination from "../_base/Pagination";

import Layout from "../Layout/Layout";
import Loader from "../_base/Loader";
import { LOADER_CAPTION } from "../../constants/Constants";
import storage from "../../config";

import { getUserAuditTrails } from "../../data/api";

const AuditTrails = () => {
  const isMounted = useRef(false);
  const isLoggedIn = storage.isLoggedIn();

  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    fetchUserAuditTrails();
    return () => (isMounted.current = false);
  }, []);

  const fetchUserAuditTrails = async (query) => {
    await getUserAuditTrails(query)
      .then((res) => {
        setAudits((prevState) => (prevState = res.data));
        setLoading((prevState) => (prevState = false));
      })
      .catch((err) => {
        setLoading((prevState) => !prevState);
      });
  };

  const renderRows = () => {
    return audits.data.map((item, i) => {
      console.log(item);
      return item.audits.map((audit, i) => {
        return (
          <tr key={i}>
            <th scope="row">
              <small>{audit.id}</small>
            </th>
            <td>
              <small>{audit.new_values.email}</small>
            </td>
            <td>
              <small>{audit.new_values.name}</small>
            </td>
            <td>
              <small>{audit.new_values.type}</small>
            </td>
            <td>
              <small>{audit.event}</small>
            </td>
            <td>
              <small>{formatDate(audit.created_at)}</small>
            </td>
          </tr>
        );
      });
    });
  };

  return (
    <Layout isLoggedIn={isLoggedIn}>
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
            <h2 className="py-1 subHeader">Activity Audit</h2>
            <table className="table table-striped table-sm table-bordered">
              <thead>
                <tr>
                  {userAuditTrailTableHeader.map((thead, i) => {
                    return (
                      <th
                        className={`${
                          thead === "Action" ? "thead-action" : ""
                        }`}
                        scope="col"
                        key={thead}
                      >
                        {thead}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>{audits.data && renderRows()}</tbody>
            </table>
            <div className="d-flex justify-content-center align-items-center mt-3 pagination">
              <nav aria-label="Page navigation">
                <Pagination pageData={audits} cb={fetchUserAuditTrails} />
              </nav>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuditTrails;
