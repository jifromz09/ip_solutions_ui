import React, { useEffect, useState } from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
import { getIPAddresses } from "../data/api";
import NavBar from "./_base/NavBar";
import Layout from "./Layout/Layout";
import storage from "../config";

const Main = () => {
  const [ipAdds, setIPAdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ipAdd, setIpAdd] = useState("");
  const [isLoggedIn, settIsLoggedIn] = useState(storage.isLoggedIn());

  useEffect(() => {
    queryIPs();
  }, []);

  const queryIPs = async () => {
    const { data } = await getIPAddresses();
    setIPAdds((prevState) => (prevState = data));
    setLoading((prevState) => !prevState);
  };

  return (
    <Layout>
      <Outlet context={[ipAdds, loading, ipAdd, isLoggedIn, setIpAdd, setLoading]} />
    </Layout>
  );
};

export default Main;
