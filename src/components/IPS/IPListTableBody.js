import React, { memo, useCallback, useEffect } from "react";
import { UPDATE_IP, IP_LOGS } from "../../constants/RouteConstants";
import { useNavigate } from "react-router-dom";
import Button from "../../components/_base/Button";

const IPListTableBody = ({ ipAddresses, tokenData }) => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onUpdate = useCallback(
    ({ label, id, ip_address }) => {
      navigate(`${UPDATE_IP}/${id}`, { state: { label, id, ip_address } });
    },
    [ipAddresses]
  );
  const onViewLogs = useCallback(({ id }) => {
    navigate(`${IP_LOGS}/${id}`, { state: { id: id } });
  });

  return (
    <tbody>
      {ipAddresses &&
        ipAddresses.map((item) => {
          return (
            <tr key={item.ip_address}>
              <th scope="row">{item.id}</th>
              <td>
                <small>{item.ip_address}</small>
              </td>
              <td>
                <small>{item.label}</small>
              </td>
              <td className="action-container">
                <div className="d-grid gap-2 d-sm-block">
                  <Button
                    cb={() => onUpdate(item)}
                    disabled={!tokenData}
                    className={`btn-primary btn-sm`}
                    text={`Edit`}
                  />
                  <Button
                    cb={() => onViewLogs(item)}
                    disabled={!tokenData}
                    className={`btn-secondary btn-sm`}
                    text={`Logs`}
                  />
                </div>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default memo(IPListTableBody);
