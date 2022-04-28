import React from "react";

function Header() {
  function logOut() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <header>
      <h1>TimeAllot</h1>
      <p onClick={logOut}>Log Out</p>
    </header>
  );
}

export default Header;
