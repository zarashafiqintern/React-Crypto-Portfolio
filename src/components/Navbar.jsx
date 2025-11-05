import React from "react";
import { Link } from "react-router-dom";
import "./Navbar";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <h2 className="nav-logo">Crypto<span>Track</span></h2>
            </div>
            <div className="nav-links">
                <Link className="nav-link" to="/">Dashboard</Link>
                <Link className="nav-link" to="/investments">Investments</Link>
            </div>
        </nav>
    );
};
export default Navbar;