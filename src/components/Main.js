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
  const [name, setName] = useState(storage.getItem("name"));

  useEffect(() => {
    console.log(name);
    queryIPs();
  }, []);

  const queryIPs = async () => {
    const { data } = await getIPAddresses();
    setIPAdds((prevState) => (prevState = data));
    setLoading((prevState) => !prevState);
  };

  return (
    <Layout>
      <div className="container">
        <NavBar />
        <Outlet context={[ipAdds, loading, ipAdd, setIpAdd, setLoading]} />
      </div>
    </Layout>
  );
};

export default Main;
