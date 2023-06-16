import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {isAuthenticated === false ? (
        <Route path="*" element={<Welcome />} />

      ) : (
        <Route path="*" element={<Home />} />
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
};

export default App;
