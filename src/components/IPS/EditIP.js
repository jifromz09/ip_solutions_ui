import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "../_base/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { ADDRESSES } from "../../constants/RouteConstants";
import TextInput from "../_base/TextInput";
import { hideErrorAlert } from "../../Helpers";
import { updateIPLabel } from "../../data/api";
import Alert from "../_base/Alert";
import { AppContext } from "../Main";
import { LABEL_REQUIRED } from "../../constants/AlertMessages";

const EditIP = () => {
  const {
    showErrorAlert,
    setShowErrorAlert,
    alertMessage,
    setAlertMessage,
    setAlertClassName,
    alertClassName,
    loading,
    setLoading,
    setResponseResult,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { label, id, ip_address } = state;
  const [currLabel, setLabel] = useState(label);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearTimeout(hideErrorAlert);
    };
  }, []);

  const onLabelChange = (e) => {
    const { value } = e.target;
    setLabel((prevState) => (prevState = value));
  };

  const onUpdate = () => {
    if (!currLabel) {
      setShowErrorAlert((prevState) => (prevState = true));
      setAlertClassName((prevState) => (prevState = "alert-danger"));
      setAlertMessage((prevState) => (prevState = LABEL_REQUIRED));
      hideErrorAlert(setShowErrorAlert);
      return;
    }

    updateLabel();
  };

  const updateLabel = async () => {
    setLoading((prevState) => !prevState);
    await updateIPLabel(currLabel, id)
      .then((res) => {
        const { message, data } = res.data;

        // let newArr = ipAdds;
        // newArr.data.map((ip) => {
        //   return ip.id === data.id ? { ...ip, label: data.label } : { ...ip };
        // });

        if (!isMounted.current) return;
      
        setResponseResult(message, "alert-success");
      })
      .catch((err) => {      
        const { message } = err.response.data;
        setResponseResult(message, "alert-danger");
      });
  };

  return (
    <div className="row g-0">
      <div className="col p-4">
        <div className="input-group mb-3">
          <TextInput
            className={`form-control`}
            value={ip_address}
            ph={`IP Address`}
            disabled={true}
          />
        </div>
        <div className="input-group mb-3">
          <TextInput
            className={`form-control`}
            value={currLabel}
            cb={onLabelChange}
            ph={`Label`}
          />
        </div>
        <Button
          disabled={loading}
          className={`btn btn-sm btn-edit`}
          cb={() => {
            onUpdate();
          }}
          text={loading ? "Updating..." : "Update"}
        />
        <Button
          disabled={loading}
          className={`btn btn-secondary ms-2 btn-sm`}
          cb={() => {
            navigate(ADDRESSES);
          }}
          text={`Back`}
        />
        <Alert
          message={alertMessage}
          showErrorAlert={showErrorAlert}
          className={alertClassName}
        />
      </div>
    </div>
  );
};

export default EditIP;
