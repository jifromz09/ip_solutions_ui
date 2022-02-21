import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
import { getIPAddresses } from "../data/api";
 
import Layout from "./Layout/Layout";
import storage from "../config";

const Main = () => {
  const [ipAdds, setIPAdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ipAdd, setIpAdd] = useState("");
  const isLoggedIn = storage.isLoggedIn();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    queryIPs();
    return () => (isMounted.current = false);
  }, []);

  const queryIPs = async () => {
    const { data } = await getIPAddresses();
    if (!isMounted.current) return;
    setIPAdds((prevState) => (prevState = data));
    setLoading((prevState) => !prevState);
  };

  return (
    <Layout>
      <Outlet
        context={[ipAdds, loading, ipAdd, isLoggedIn, setIpAdd, setLoading]}
      />
    </Layout>
  );
};

export default Main;
