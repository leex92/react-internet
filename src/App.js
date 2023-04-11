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
import ParticipantWeapon from "./pages/participant/weapon";
import ApplyGame from "./pages/participant/apply";
import JoinGame from "./pages/participant/join";
function App() {
  const [userType, setUserType] = useState(1);
  const [type, setType] = useState(0);
  useState(() => {
    const local = localStorage.getItem("type");
    setType(local);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {+type === 0 && (
            <>
              <Route path="/" element={<ManageMirror />}></Route>
              <Route path="/mirror" element={<ManageMirror />}></Route>
              <Route path="/range" element={<ManageRange />}></Route>
              <Route path="/scene" element={<ManageScene />}></Route>
              <Route path="/weapon" element={<ManageWeapon />}></Route>
              <Route path="/game" element={<ManageGame />}></Route>
              <Route path="/manage-user" element={<ManageUser />}></Route>
            </>
          )}
          {(+type === 2 || +type === 3) && (
            <>
              <Route path="/" element={<ParticipantWeapon />}></Route>
              <Route path="/weapon" element={<ParticipantWeapon />}></Route>
              <Route path="/applygame" element={<ApplyGame />}></Route>
              <Route path="/join" element={<JoinGame />}></Route>
            </>
          )}
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
