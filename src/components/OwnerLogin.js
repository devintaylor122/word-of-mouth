import { useState, useEffect } from "react";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function OwnerLogin(props) {
  const setOwner = props.setOwner;
  const { anyUser } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  console.log("AUTH in FBC: ", auth);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      // this will create a new user in our authentication in firbase and at the same time in will log you in
      console.log("YOOOOO");
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      // setOwner({ email: loginEmail, loginPassword: loginPassword });
      setOwner(user.user.uid)
      console.log("check", user.user.uid);
      // const currentOwner = props.ownersList.find(
      //   (owner) => owner.uid === user.user.uid
      // );
      // console.log("Another Check, ", currentOwner);
      navigate("/owner/dash");
    } catch (error) {
      alert("Check your email or password");
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    // setOwner({ email: loginEmail, loginPassword: loginPassword });
    navigate("/");
    console.log(loginEmail, "Logout", loginPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginPassword || !loginEmail) return;
    // setOwner({ email: loginEmail, loginPassword: loginPassword });
    // navigate("/customer/dash");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3> Owner Login </h3>
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
        <button onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"} Password
        </button>

        <div>
          <button type="submit" onClick={login}>
            {" "}
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default OwnerLogin;
