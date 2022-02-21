import React, { useEffect, useState } from "react";
import Button from "../_base/Button";
import { Link, useOutletContext } from "react-router-dom";
import { ADDRESSES } from "../../constants/RouteConstants";
import TextInput from "../_base/TextInput";
import { isIP } from "is-ip";
import Alert from "../_base/Alert";
import { saveIPAdress } from "../../data/api";
import {hideErrorAlert} from '../../Helpers';

const LABEL_REQUIRED = "Label is required!";
const INVALID_IP_ADDRESS = "Invalid IP Address!";

const AddNewIP = () => {
  const [loading, setLoading] = useState(false);
  const [ip_address, setIpAddress] = useState(null);
  const [label, setLabel] = useState("");
  const [isIPValid, setIsIPValid] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(INVALID_IP_ADDRESS);
  const [alertClassName, setAlertClassName] = useState("alert-danger");

  useEffect(() => {
    return () => {
      clearTimeout(hideErrorAlert);
    };
  }, []);

  const onIPTextChange = (e) => {
    const { value } = e.target;
    setIpAddress((prevState) => (prevState = value));
    if (value && !isIP(value)) {
      setIsIPValid((prevState) => (prevState = false));
      return;
    }
    setIsIPValid((prevState) => (prevState = true));
  };

  const onLabelChange = (e) => {
    const { value } = e.target;
    setLabel((prevState) => (prevState = value));
  };

  const saveIPAddress = () => {
    if (!isIPValid || !ip_address) {
      setShowErrorAlert((prevState) => (prevState = true));
      setAlertMessage((prevState) => (prevState = INVALID_IP_ADDRESS));
      hideErrorAlert(setShowErrorAlert);
      return;
    }

    if (!label) {
      setShowErrorAlert((prevState) => (prevState = true));
      setAlertMessage((prevState) => (prevState = LABEL_REQUIRED));
      hideErrorAlert(setShowErrorAlert);
      return;
    }

    saveNewIP();
  };

  const saveNewIP = async () => {
    setLoading(prevState => !prevState)
    await saveIPAdress({ label, ip_address })
      .then((res) => {
        const { message } = res.data;
        setResponseResult(message, 'alert-success');
        setIpAddress(null);
        setLabel("");
        setLoading(prevState => !prevState)
      })
      .catch((err) => {
        const { message } = err.response.data;
        setResponseResult(message, 'alert-danger');
        setLoading(prevState => !prevState)
      });
  };

  const setResponseResult = (message, className) => {
    setAlertClassName((prevState) => (prevState = className));
    setAlertMessage((prevState) => (prevState = message));
    setShowErrorAlert((prevState) => (prevState = true));
    hideErrorAlert(setShowErrorAlert);
  }

 
  return (
    <div className="row g-0">
      <div className="col p-4">
        <div className="input-group mb-3">
          <TextInput
            className={`form-control ${
              isIPValid === false ? "border border-3 border-danger" : ""
            }`}
            value={ip_address || ""}
            cb={onIPTextChange}
            ph={`IP Address`}
          />
        </div>
        <div className="input-group mb-3">
          <TextInput
            className={`form-control`}
            cb={onLabelChange}
            value={label}
            ph={`Label`}
          />
        </div>
        <Button
          disabled={loading}
          className={`btn-primary btn-sm`}
          cb={() => {
            saveIPAddress();
          }}
          text={`Save`}
        />
        <Link
          disabled={loading}
          className="btn btn-secondary ms-2 btn-sm"
          to={ADDRESSES}
        >
          Back
        </Link>
        <Alert
          message={alertMessage}
          showErrorAlert={showErrorAlert}
          className={alertClassName}
        />
      </div>
    </div>
  );
};

export default AddNewIP;
