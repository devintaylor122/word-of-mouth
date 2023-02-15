import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./LoggedInNav.css";
import useAuth from "../hooks/useAuth";
import logo from "../WOMlogo.png";

function SharedOwnerLayout() {
  const { anyUser } = useAuth();
  return (
    <div className="sharedCustLayout">
      <div className="womlogo">
        <img src={logo} alt="" />
      </div>
      <nav className="sharedNav">
        <button className="home-page">
          <Link to="/"> HOME </Link>
        </button>

        <button className="owner-dash">
          <Link to="/owner/dash">DASH</Link>
        </button>

        <button className="message-dash">
          <Link to="/owner/messaging">MESSAGES</Link>
        </button>

        <button className="logout">
          <Link to="/">LOGOUT</Link>
        </button>
      </nav>
      {/* <h2>Logged in as: {anyUser.email}</h2> */}
      <Outlet />
    </div>
  );
}

export default SharedOwnerLayout;
