import React from "react";
import "./Footer.css";

const Footer = ({ onLogout }) => {
  return (
    <div>
      <footer className="footer-bg">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Contact us at :
            operibank@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
