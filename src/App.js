import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRouteWrapper from "./components/Route/PrivateRouteWrapper";
import Loader from "./components/_base/Loader";

import {
  SAVE_IP,
  UPDATE_IP,
  LOGIN,
  REGISTER,
  ADDRESSES,
} from "../src/constants/RouteConstants";
import storage from "./config";

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Edit = lazy(() => import("./components/ip/Edit"));
const List = lazy(() => import("./components/ip/List"));
const Main = lazy(() => import("./components/Main"));
const AddNewIP = lazy(() => import("./components/ip/AddNewIP"));
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  const isAuthenticated = storage.isLoggedIn();
 
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={LOGIN} element={<Login />} />
          <Route path={ADDRESSES} element={<Main />}>
            <Route path={ADDRESSES} element={<List />} />
            <Route path={SAVE_IP} element={
              <PrivateRouteWrapper isAuthenticated={isAuthenticated} redirectTo={LOGIN}>
                <AddNewIP />
              </PrivateRouteWrapper>
            } />
            <Route path={UPDATE_IP} element={
              <PrivateRouteWrapper isAuthenticated={isAuthenticated} redirectTo={LOGIN}>
                <Edit />
              </PrivateRouteWrapper>
            } />
          </Route>
          <Route path={REGISTER} element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
