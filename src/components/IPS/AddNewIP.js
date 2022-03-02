import React, { useEffect, useState, useContext, useRef } from "react";
import { isIP } from "is-ip";
import Alert from "../_base/Alert";
import { saveIPAdress } from "../../data/api";
import { setAlertErrorConfig, hideErrorAlert } from "../../Helpers";
import IPInputForm from "./IPInputForm";
import { ALERT_SUCCESSS } from "../../constants/AlertMessages";
import { AppContext } from "../../appcontext";
import isEmpty from "lodash/isEmpty";

const input_errors = (message) => {
  return {
    ip_address: [message],
    message: message,
    id: null,
  };
};

const AddNewIP = () => {
  const { fetching, setFetching, setAlertConfig, alertConfig } =
    useContext(AppContext);

  const [ipFieldData, setIPFieldData] = useState({
    ip_address: "",
    label: "",
    id: null
  });
  const [isIPValid, setIsIPValid] = useState(null);

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
    if (name === "ip_address") {
      if (value && !isIP(value)) {
        setIsIPValid((prevState) => (prevState = false));
        setErrors(
          (prevState) =>
            (prevState = input_errors("ip_address", "Invalid IP Address."))
        );
        return;
      }
      setIsIPValid((prevState) => (prevState = true));
      setErrors((prevState) => (prevState = {}));
      return;
    }
  };

  const saveNewIP = async () => {
    if (!isIPValid || !ipFieldData.ip_address) {
      return;
    }

    if (isEmpty(ipFieldData.label)) {
      setErrors(
        (prevState) =>
          (prevState = input_errors("label", "IP address label is required."))
      );
      return;
    }

    setFetching((prevState) => (prevState = true));
    await saveIPAdress(ipFieldData)
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
          onSave={saveNewIP}
          fetching={fetching}
          ipFieldData={ipFieldData}
          errors={errors}
        />
        <Alert {...alertConfig} />
      </div>
    </div>
  );
};

export default AddNewIP;
