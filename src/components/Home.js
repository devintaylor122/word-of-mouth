import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <nav>
        <button className="home">
          <Link to="/"> HOME </Link>
        </button>

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

        <button className="customerDash">
          <Link to="CustomerDashboard">Customer Dash</Link>
        </button>
      </nav>
      <p> Welcome to Word of Mouth...</p>
    </div>
  );
}

export default Home;
