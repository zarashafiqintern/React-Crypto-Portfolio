import React from "react";
import "./Header.css";
// import { Link } from "react-router-dom";

const Header = () => {
  const data = {
    icon: "💰",
    title: "Crypto Portfolio Tracker",
    subtitle: "Track your cryptocurrency investments with live Binance prices",
  };

  return (
    <>
      {/* <nav className="navbar">
        <div className="nav-left">
          <h2 className="nav-logo">Crypto<span>Track</span></h2>
        </div>
        <div className="nav-links">
          <Link className="nav-link" to="/">Dashboard</Link>
          <Link className="nav-link" to="/investments">Investments</Link>
        </div>
      </nav> */}

      <header className="header">
        <div className="header-content">
          <span className="icon">{data.icon}</span>
          <h1 className="title">{data.title}</h1>
        </div>
        <p className="subtitle">{data.subtitle}</p>
      </header>
    </>
  );
};

export default Header;
