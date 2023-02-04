import React from "react";
import { Link, Outlet } from "react-router-dom";

function SharedCustLayout() {
  return (
    <div>
      <nav>
        <button className="home">
          <Link to="/"> HOME </Link>
        </button>

        <button className="customer-dash">
          <Link to="/customer/dash">DASH</Link>
        </button>

        <button className="service-providers">
          <Link to="/customer/list ">Services</Link>
        </button>

        <button className="messages">
          <Link to="/customer/messages">MESSAGES</Link>
        </button>

        <button className="logout">
          <Link to="/">LOGOUT</Link>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

export default SharedCustLayout;
