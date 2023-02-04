import { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./components/Home";
// import OwnerForm from "./components/OwnerForm";
// import CustomerLogin from "../components/CustomerLogin";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import CustomerDashboard from "./CustomerDashboard";

function CustomerLogin({ setAUser })  {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // const setCustomer = props.setCustomer;

  // const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      // this will create a new user in our authentication in firbase and at the same time in will log you in
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setAUser({ email: loginEmail, loginPassword: loginPassword });
      console.log(user);
    } catch (error) {
      alert("Check your email or password");
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
    setAUser({ email: loginEmail, loginPassword: loginPassword });
    console.log(loginEmail, "Logout", loginPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginPassword || !loginEmail) return;
    setAUser({ email: loginEmail, loginPassword: loginPassword });
    // navigate("/owner/dash");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h3> Customer Login </h3>
      <input
        type="email"
        placeholder="Email..."
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password..."
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
      />

      <div>
        <button onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </div>

      <div>
          <button type="submit" onClick={login}>
            {" "}
            Login
          </button>
      </div>

        {/* <h4> User Logged In: </h4>
        {user?.email} */}
        {/* <Link to="/csutomerDashboard"> 
        <button onClick={logout}> Log In </button>
        </Link> */}
      </form>
    </div>
  );
}

export default CustomerLogin;
