import React, { useState } from "react";
import "./App.less";
import Layout from "./layouts";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import ManageRange from "./pages/manager/range";
import ManageMirror from "./pages/manager/mirror";
import ManageWeapon from "./pages/manager/weapon";
import ManageUser from "./pages/manager/user";
import ManageGame from "./pages/manager/game";
import ManageScene from "./pages/manager/scene";
function App() {
  const [userType, setUserType] = useState(1);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ManageMirror />}></Route>
          <Route path="/mirror" element={<ManageMirror />}></Route>
          <Route path="/range" element={<ManageRange />}></Route>
          <Route path="/scene" element={<ManageScene />}></Route>
          <Route path="/weapon" element={<ManageWeapon />}></Route>
          <Route path="/game" element={<ManageGame />}></Route>
          <Route path="/manage-user" element={<ManageUser />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
