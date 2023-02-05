import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";

function SharedLoggedOutLayout() {
  return (
    <div className="logged-out-nav">
      <nav>
        <button type="logged-out">
          <Link to="/"> HOME </Link>
        </button>

        <button className="ownerSignUp">
          <Link to="/OwnerForm">OWNER SIGN-UP</Link>
        </button>

        <button className="ownerCreateAccount">
          <Link to="/ownerCreateAccount">OWNER Create Account</Link>
        </button>
        <button className="CustomerCreateAccount">
          <Link to="/CustomerCreateAccount">Customer Create Account</Link>
        </button>

        <button className="customerForm">
          <Link to="/CustomerForm">CUSTOMER Form</Link>
        </button>

        <button className="ownerLogin">
          <Link to="/OwnerLogin">OWNER LOG-IN</Link>
        </button>

        <button className="customerLogin">
          <Link to="/CustomerLogin">CUSTOMER LOG-IN</Link>
        </button>

        <button className="customerDash">
          <Link to="/CustomerDashboard">Customer Dash</Link>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

export default SharedLoggedOutLayout;
