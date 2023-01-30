import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

function Home() {
  return (
    <div className="home"> 
      <nav>
        <Link to="/"> HOME </Link>
        <Link to="/OwnerForm">OWNER SIGN-UP</Link>
        <Link to="/CustomerForm"> CUSTOMER SIGN-IN </Link>
        <Link to="/OwnerLogin"> OWNER LOG-IN </Link>
        <Link to="/CustomerLogin"> CUSTOMER LOG-IN </Link>
        <Link to="CustomerDashboard">Customer Dash</Link>
      </nav>
      <p> Welcome to Word of Mouth...</p>
    </div>
  );
}

export default Home;
