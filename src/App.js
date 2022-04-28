import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Today from "./Components/Today";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const loginClient = () => setLoggedIn(!isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("id")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="*"
          element={isLoggedIn ? <Today /> : <Login logFunction={loginClient} />}
        />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
