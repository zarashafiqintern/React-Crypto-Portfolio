import React from "react";
import Navbar from "../components/Navbar";  
import Header from "../components/Header"; 
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <Header
        icon="💰"
        title="Crypto Portfolio Tracker"
        subtitle="Track your cryptocurrency investments with live Binance prices"
      />

      <Outlet />
    </div>
  );
}

export default Layout;
