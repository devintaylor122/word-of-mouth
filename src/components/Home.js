import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <nav>
        <Link className="home" to="/">
          {" "}
          HOME{" "}
        </Link>
        <button className="ownerSignUp">
          <Link to="/OwnerForm">OWNER SIGN-UP</Link>
        </button>
        <button className="customerSignUp">
          <Link to="/CustomerForm">CUSTOMER SIGN-IN</Link>
        </button>

        <button className="ownerLogin">
          <Link to="/OwnerLogin">OWNER LOG-IN</Link>
        </button>

        <button className="customerLogin">
          <Link to="/CustomerLogin">CUSTOMER LOG-IN</Link>
        </button>

        <Link className="customerDash" to="CustomerDashboard">
          Customer Dash
        </Link>
      </nav>
      <p> Welcome to Word of Mouth...</p>
    </div>
  );
}

export default Home;
