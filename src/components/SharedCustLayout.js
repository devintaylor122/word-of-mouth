import React from "react";
import { Link } from "react-router-dom";

function SharedCustLayout() {
  return (
    <nav>
      <button className="home">
        <Link to="/"> HOME </Link>
      </button>

      <button className="customer-dash">
        <Link to="/customerdash">DASH</Link>
      </button>

      <button className="service-providers">
        <Link to="/customerdash/serviceproviders ">Services</Link>
      </button>

      <button className="messages">
        <Link to="/customerdash/messages">MESSAGES</Link>
      </button>

      <button className="logout">
        <Link to="/">LOGOUT</Link>
      </button>
    </nav>
  );
}

export default SharedCustLayout;
