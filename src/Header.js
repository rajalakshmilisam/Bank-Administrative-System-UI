import React from "react";
import "./Header.css";
import logo from '../src/pages/logo.png'

const Header = ({ onLogout }) => {
  return (
    <div>
      <header className="header-bg">
        <div className="logo-container">
          <img src={logo} alt="Logo" width={40} className="logo" />
          <h4>OperIBanK</h4>
        </div>
      </header> 
    </div>
  );
};

export default Header;
