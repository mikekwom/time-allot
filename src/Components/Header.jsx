import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Today from "./Today";
import Totals from "./Totals";

function Header() {
  function logOut() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
          <h1 className="logo">TimeAllot</h1>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/today" className="nav-link">
                  Today
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/totals" className="nav-link">
                  Totals
                </Link>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={logOut}>
                  Log Out
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/today" element={<Today />} />
        <Route path="/totals" element={<Totals />} />
      </Routes>
    </div>
  );
}

export default Header;
