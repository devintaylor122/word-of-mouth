
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./components/Home";
// import OwnerForm from "./components/OwnerForm";
// import OwnerLogin from "../components/OwnerLogin";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../firebaseconfig";





function OwnerLogin() {
    // const [registerEmail, setRegisterEmail] = useState("");
    // const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});


    const login = async () => {
        try {
          // this will create a new user in our authentication in firbase and at the same time in will log you in
        const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
        console.log(user);
        } catch (error) {
        console.log(error.message);
        }
    };
    const logout = async () => {
        await signOut(auth);
    };

return (
    <div>
        <h3> Login </h3>
        <input
            placeholder="Email..."
            onChange={(event) => {
            setLoginEmail(event.target.value);
            }}
        />
        <input
            placeholder="Password..."
            onChange={(event) => {
            setLoginPassword(event.target.value);
            }}
        />
    
        <div>
    <button onClick={login}> Login</button>
        </div>

    <h4> User Logged In: </h4>
        {user?.email}
        
    <button onClick={logout}> Sign Out </button>

    </div>
);
}

export default OwnerLogin