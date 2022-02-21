import "./App.css";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Main from "./components/Main";
import { Route, Routes } from "react-router-dom";
import AddNewIP from "./components/ip/AddNewIP";
import Edit from "../src/components/ip/Edit";
import List from "../src/components/ip/List";

import {
  SAVE_IP,
  UPDATE_IP,
  LOGIN,
  REGISTER,
  ADDRESSES,
} from "../src/constants/RouteConstants";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={ADDRESSES} element={<Main />}>
          <Route path={ADDRESSES} element={<List />} />
          <Route path={SAVE_IP} element={<AddNewIP />} />
          <Route path={UPDATE_IP} element={<Edit />} />
        </Route>
        <Route path={REGISTER} element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
