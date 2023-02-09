import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SharedCustLayout() {
  const { anyUser } = useAuth();
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
      {/* <h2>Logged in as: {anyUser.email}</h2> */}
      <Outlet />
    </div>
  );
}

export default SharedCustLayout;
