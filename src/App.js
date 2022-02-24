import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
 
import {
  SAVE_IP,
  UPDATE_IP,
  LOGIN,
  REGISTER,
  ADDRESSES,
  IP_LOGS,
  USER_ACTIVITY_LOGS,
  USER_AUDIT_TRAILS,
} from "../src/constants/RouteConstants";

import Login from "./components/Login";
import Register from "./components/Register";
import EditIP from "./components/IPS/EditIP";
import IPList from "./components/IPS/IPList";
import Main from "./components/Main";
import AddNewIP from "./components/IPS/AddNewIP";
import NotFound from "./components/NotFound";
import IPAuditLogs from "./components/IPS/IPAuditLogs";
import UserLogs from "./components/User/UserLogs";
import AuditTrails from "./components/User/AuditTrails";

const App = () => {
  return (
    <>    
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={ADDRESSES} element={<Main />}>
          {/* ... protected children subroutes ... */}
          <Route path={ADDRESSES} element={<IPList />} />
            <Route path={SAVE_IP} element={<AddNewIP />} />
            <Route path={`${UPDATE_IP}/:id`} element={<EditIP />} />
            <Route path={`${IP_LOGS}/:id`} element={<IPAuditLogs />} />
        </Route>

        <Route path={USER_ACTIVITY_LOGS} element={<UserLogs />} /> 
        <Route path={USER_AUDIT_TRAILS} element={<AuditTrails />} /> 
        <Route path={REGISTER} element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
