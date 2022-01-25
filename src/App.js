import "./App.css";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Home from "../src/components/Home";
import { Route, Routes } from "react-router-dom";
import Add from "../src/components/ip/Add";
import Edit from "../src/components/ip/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<Home />}>
          <Route path="add" element={<Add />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
