import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

import UserLogs from "./UserLogs";
import AuditTrails from "./AuditTrails";
import storage from "../../config";

import { ADDRESSES } from "../../constants/RouteConstants";
import { getUserAuditTrails, getUserLogs } from "../../data/api";
import Layout from "../Layout/Layout";
import Loader from "../_base/Loader";
import { LOADER_CAPTION } from "../../constants/Constants";

const IPAuditLogs = () => {
  const isMounted = useRef(false);
  const isLoggedIn = storage.isLoggedIn();

  const [logs, setLogs] = useState([]);
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    fetchUserLogs();
    fetchUserAuditTrails();
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
            <h2 className="mb-3 pt-3 subHeader">User Activities</h2>
            {logs ? (
              <UserLogs logs={logs.data} cb={fetchUserLogs} />
            ) : (
              <div>No data found!</div>
            )}
            {audits ? (
              <AuditTrails audits={audits.data} cb={fetchUserAuditTrails} />
            ) : (
              <div>No data found!</div>
            )}
            <div className="col button-container">
              <Link className="btn btn-secondary ms-2 btn-sm" to={ADDRESSES}>
                Back
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IPAuditLogs;
