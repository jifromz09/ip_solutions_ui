import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { formatDate } from "../../Helpers";
import { userAuditTrailTableHeader } from "../../data/static/tableHeader";
import Pagination from "../_base/Pagination";
import Table from "../../components/_base/Table/Table";
 
import Layout from "../Layout/Layout";
import Loader from "../_base/Loader";
import { LOADER_CAPTION } from "../../constants/Constants";
import storage from "../../config";

import isEmpty from 'lodash/isEmpty';
import NoDataFound from "../_base/Table/NoDataFound";

import { getUserAuditTrails } from "../../data/api";

import {Link} from "react-router-dom";
import {ADDRESSES}from "../../constants/RouteConstants";

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

        {loading && <Loader caption={LOADER_CAPTION} show={true} />}

        {!loading && (
          <div className="row px-3">
            <h2 className="mb-3 pt-3 subHeader">User Audit Trails</h2>
            <Table header={userAuditTrailTableHeader}>
              {!isEmpty(audits.data) && (
                <tbody>{audits.data && renderRows()}</tbody>
              )}
            </Table>
            {isEmpty(audits.data) && <NoDataFound />}
            {!isEmpty(audits.data) && (
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
                    pageData={audits}
                    cb={audits}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuditTrails;
