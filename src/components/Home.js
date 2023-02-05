import React from "react";
import { Link } from "react-router-dom";
import CustomerLogin from "./CustomerLogin";
import "./Home.css";
import OwnerLogin from "./OwnerLogin";

function Home() {
  return (
    <div className="home-page">
      {/* <nav>
        <button className="home">
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
      </nav> */}
      <p> Welcome to Word of Mouth. <br></br>This is where customers meet their skilled service providers.</p>
      <div id="contactTile">
        <OwnerLogin></OwnerLogin>
      </div>
      <div id="contactTile">
        <CustomerLogin></CustomerLogin>
      </div>
    </div>
  );
}

export default Home;
