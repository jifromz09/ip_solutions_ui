import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { formatDate } from "../../Helpers";
import { userLogsTableHeader } from "../../data/static/tableHeader";
import Pagination from "../_base/Pagination";
import Layout from "../Layout/Layout";
import Loader from "../_base/Loader";
import { LOADER_CAPTION } from "../../constants/Constants";
import storage from "../../config";

import { getUserLogs } from "../../data/api";

const UserLogs = () => {
  const isMounted = useRef(false);
  const isLoggedIn = storage.isLoggedIn();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    fetchUserLogs();

    return () => (isMounted.current = false);
  }, []);

  const fetchUserLogs = async (query) => {
    await getUserLogs(query)
      .then((res) => {
        setLogs((prevState) => (prevState = res.data));
        setLoading((prevState) => (prevState = false));
      })
      .catch((err) => {
        setLoading((prevState) => !prevState);
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
            <h2 className="py-1 subHeader">Log Audit</h2>
            <table className="table table-striped table-sm table-bordered">
              <thead>
                <tr>
                  {userLogsTableHeader.map((thead, i) => {
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
              <tbody>
                {logs.data &&
                  logs.data.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          <small>{item.id}</small>
                        </th>
                        <td>
                          <small>{item.log_type}</small>{" "}
                        </td>
                        <td>
                          <small>{item.data}</small>
                        </td>
                        <td>
                          <small>{formatDate(item.date)}</small>{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center align-items-center mt-3 pagination">
              <nav aria-label="Page navigation">
                <Pagination pageData={logs} cb={fetchUserLogs} />
              </nav>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserLogs;
