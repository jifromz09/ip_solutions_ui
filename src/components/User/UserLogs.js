import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { formatDate } from "../../Helpers";
import { userLogsTableHeader } from "../../data/static/tableHeader";
import Pagination from "../_base/Pagination";
import Layout from "../Layout/Layout";
import Loader from "../_base/Loader";
import { LOADER_CAPTION } from "../../constants/Constants";
import storage from "../../config";
import Table from "../_base/Table/Table";
import NoDataFound from "../_base/Table/NoDataFound";

import { Link } from "react-router-dom";

import isEmpty from "lodash/isEmpty";

import { getUserLogs } from "../../data/api";
import {ADDRESSES} from "../../constants/RouteConstants";

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

  const renderRows = () => {
    return logs.data.map((item, i) => {
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
    });
  };

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div
        className={`row px-2 justify-content-center ${
          loading ? "align-items-center" : "align-items-start"
        } h-100`}
      >
        <div className="col">

          {loading && <Loader caption={LOADER_CAPTION} show={true} />}

          {!loading && (
            <div className="row px-3">
              <h2 className="mb-3 pt-3 subHeader">User Audit Logs</h2>
              <Table header={userLogsTableHeader}>
                {!isEmpty(logs.data) && (
                  <tbody>{logs.data && renderRows()}</tbody>
                )}
              </Table>
              {isEmpty(logs.data) && <NoDataFound />}
              {!isEmpty(logs.data) && (
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
                    <Pagination                     
                      pageData={logs}
                      cb={fetchUserLogs}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserLogs;
