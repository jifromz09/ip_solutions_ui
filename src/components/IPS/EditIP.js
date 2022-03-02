import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { updateIPLabel } from "../../data/api";
import Alert from "../_base/Alert";
import { AppContext } from "../../appcontext";
import { setAlertErrorConfig, hideErrorAlert } from "../../Helpers";
import { ALERT_SUCCESSS } from "../../constants/AlertMessages";
import IPInputForm from "./IPInputForm";
 
const input_errors = (field, message) => {
  return {
    [field]: [message],
    message: message,
  };
};

const EditIP = () => {
  const {
    state: { label, ip_address, id },
  } = useLocation();

  const { fetching, setFetching, setAlertConfig, alertConfig } =
    useContext(AppContext);

  const [ipFieldData, setIPFieldData] = useState({
    ip_address: ip_address,
    label: label,
    id: id,
  });

  const [errors, setErrors] = useState({});

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearTimeout(hideErrorAlert);
    };
  }, []);

  const onTextChange = (e) => {
    const { value, name } = e.target;

    setIPFieldData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const updateLabel = async () => {
    if (!ipFieldData.label) {
      setErrors(
        (prevState) =>
          (prevState = input_errors("label", "IP address label is required."))
      );
      return;
    }

    setFetching((prevState) => (prevState = true));
    await updateIPLabel(ipFieldData.label, id)
      .then((result) => {
        const { status, data } = result;

        if (!isMounted.current) return;
        setFetching((prevState) => (prevState = false));
        setErrors({});

        if (status === 200) {
          const { message } = data;
          setAlertErrorConfig(
            {
              message: message,
              show: true,
              classname: ALERT_SUCCESSS,
            },
            setAlertConfig
          );
        }
      })
      .catch((err) => {
        const { data, status } = err.response;
        if (status === 422) {
          setErrors((prevState) => (prevState = { ...data?.errors }));
        }
        setFetching((prevState) => (prevState = false));
      });
  };

  return (
    <div className="row g-0">
      <div className="col-sm-12 col-md-8 col-lg-6 p-4">
        <IPInputForm
          onTextChange={onTextChange}
          onSave={updateLabel}
          fetching={fetching}
          ipFieldData={ipFieldData}
          errors={errors}
        />
        <Alert {...alertConfig} />
      </div>
    </div>
  );
};

export default EditIP;
