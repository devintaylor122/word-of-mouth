import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";

function SharedOwnerLayout() {
  return (
    <div>
      <nav>
        <button className="home">
          <Link to="/"> HOME </Link>
        </button>

        <button className="owner-dash">
          <Link to="/ownerdash">DASH</Link>
        </button>

        <button className="messages">
          <Link to="/customerdash/messages">MESSAGES</Link>
        </button>

        <button className="logout">
          <Link to="/">LOGOUT</Link>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

export default SharedOwnerLayout;
