//Customer Form is basically just like the authorization login
//-- how do we make sure you can do them at one time and make sure they get saved in both databases
import { db } from "../firebaseconfig.js";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
// import "./CustomerForm.css";
// import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseconfig";

function CustomerForm() {
  const [newCustomer, setNewCustomer] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const usersCollectionRef = collection(db, "customers");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});
  const [newPhone, setNewPhone] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // const register = async () => {
  //   try{
  //   // this will create a new user in our authentication in firbase and at the same time in will log you in
  //   const user = await createUserWithEmailAndPassword(
  //     auth,
  //     registerEmail,
  //     registerPassword);
  //   console.log(user)
  // } catch (error) {
  //   console.log(error.message);
  //   }
  // };

  const register = async () => {
    await addDoc(usersCollectionRef, {
      customer: newCustomer,
      email: newEmail,
    });
  };

  return (
    <form className="form">
      <h3> Register Customer</h3>
      <div>
        <input
          placeholder="Name..."
          onChange={(event) => {
            setNewCustomer(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Phone number (no spaces)"
          onChange={(event) => {
            setNewPhone(event.target.value);
          }}
        />
      </div>
      {/* <button onClick={createCustomer}>Submit</button> */}
      <div>
        {/* <h3> Customer Sign Up </h3> */}
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password..."
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <button onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <button onClick={register}> Create Account</button>
      </div>
    </form>
  );
}

export default CustomerForm;
