import React, { useEffect, useState, useContext, useRef } from "react";
import Button from "../_base/Button";
import { useNavigate, Link } from "react-router-dom";
import { ADDRESSES } from "../../constants/RouteConstants";
import TextInput from "../_base/TextInput";
import { isIP } from "is-ip";
import Alert from "../_base/Alert";
import { saveIPAdress } from "../../data/api";
import { hideErrorAlert } from "../../Helpers";
import { AppContext } from "../Main";
import {
  INVALID_IP_ADDRESS,
  LABEL_REQUIRED,
} from "../../constants/AlertMessages";

const AddNewIP = () => {
  const {
    loading,
    setLoading,
    showErrorAlert,
    setShowErrorAlert,
    alertMessage,
    setAlertMessage,
    alertClassName,
    setResponseResult,
    setAlertClassName,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [ip_address, setIpAddress] = useState(null);
  const [label, setLabel] = useState("");
  const [isIPValid, setIsIPValid] = useState(null);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
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
      showAlert(INVALID_IP_ADDRESS);
      return;
    }

    if (!label) {
      showAlert(LABEL_REQUIRED);
      return;
    }

    saveNewIP();
  };

  const saveNewIP = async () => {
    setLoading((prevState) => !prevState);
    await saveIPAdress({ label, ip_address })
      .then((res) => {
        const { message, data } = res.data;
        if (!isMounted.current) return;
        setResponseResult(message, "alert-success");
        setIpAddress((prevState) => (prevState = null));
        setLabel((prevState) => (prevState = ""));
      })
      .catch((err) => {
        const { message } = err.response.data;
        setResponseResult(message, "alert-danger");
      });
  };

  const showAlert = (message) => {
    setShowErrorAlert((prevState) => (prevState = true));
    setAlertMessage((prevState) => (prevState = message));
    setAlertClassName((prevState) => (prevState = "alert-danger"));
    hideErrorAlert(setShowErrorAlert);
  };

  return (
    <div className="row g-0">
      <div className="col-sm-12 col-md-8 col-lg-6 p-4">
        <div className="input-group input-group-sm mb-2">
          <TextInput
            className={`form-control ${
              isIPValid === false ? "border border-3 border-danger" : ""
            }`}
            value={ip_address || ""}
            cb={onIPTextChange}
            ph={`IP Address`}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <TextInput
            className={`form-control`}
            cb={onLabelChange}
            value={label}
            ph={`Label`}
          />
        </div>
        <div className="d-grid gap-2 d-md-block">
          <Button
            disabled={loading}
            className={`btn-primary btn-sm`}
            cb={() => {
              saveIPAddress();
            }}
            text={"Save"}
          />
          <Button
            disabled={loading}
            className={`btn-secondary btn-sm`}
            cb={() => {
              navigate(ADDRESSES);
            }}
            text={`Back to list`}
          />
         
        </div>
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
