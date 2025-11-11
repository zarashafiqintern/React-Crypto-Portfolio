import React from "react";
import "./Header.css";

const Header = ({ icon, title, subtitle }) => {
  return (
    <header className="header">
      <div className="header-content">
        <span className="icon">{icon}</span>
        <h1 className="title">{title}</h1>
      </div>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
};

export default Header;
