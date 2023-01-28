//Customer Form is basically just like the authorization login
//-- how do we make sure you can do them at one time and make sure they get saved in both databases
import { db } from "../firebaseconfig.js";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
// import "./CustomerForm.css";
// import { Link } from "react-router-dom";
import{ createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import{ auth } from '../firebaseconfig';

function CustomerForm() {
  const [newCustomer, setNewCustomer] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const usersCollectionRef = collection(db, "customers");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser)=> {
    setUser(currentUser);
  })
  const register = async () => {
    try{ 
    // this will create a new user in our authentication in firbase and at the same time in will log you in
    const user = await createUserWithEmailAndPassword(
      auth, 
      registerEmail, 
      registerPassword);
    console.log(user)
  } catch (error) {
    console.log(error.message);
    }
  };


  const createCustomer = async () => {
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
          placeholder="Email..."
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
      </div>
      <div>
          <h3> Customer Sign Up </h3>
          <input placeholder="Email..." onChange={(event) => {setRegisterEmail(event.target.value)}}/>
          <input placeholder="Password..." onChange={(event) => {setRegisterPassword(event.target.value)}}/>
          <button onClick={register}> Create Account</button>
        </div>

      <button onClick={createCustomer}>Submit</button>
    </form>
  );
}

export default CustomerForm;
