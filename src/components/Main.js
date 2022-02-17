import React, { useEffect, useState } from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
import { getIPAddresses } from "../data/api";
import NavBar from "./_base/NavBar";

const Main = () => {
  const [ipAdds, setIPAdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ipAdd, setIpAdd] = useState("");

  useEffect(() => {
    queryIPs();
  }, []);

  const queryIPs = async () => {
    const { data } = await getIPAddresses();
    setIPAdds((prevState) => (prevState = data));
    setLoading((prevState) => !prevState);
  };

  return (
    <div className="Wrapper">
      <div className="container">
        <NavBar />
        <Outlet context={[ipAdds, loading, ipAdd, setIpAdd]} />
      </div>
    </div>
  );
};

export default Main;
