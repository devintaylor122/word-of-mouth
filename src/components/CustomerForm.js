//Customer Form is basically just like the authorization login
//-- how do we make sure you can do them at one time and make sure they get saved in both databases
import { db } from "../firebaseconfig.js";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
// import "./CustomerForm.css";
// import { Link } from "react-router-dom";

function CustomerForm() {
  const [newCustomer, setNewCustomer] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const usersCollectionRef = collection(db, "customers");

  const createCustomer = async () => {
    await addDoc(usersCollectionRef, {
      customer: newCustomer,
      email: newEmail,
    });
  };

  return (
    <form className="form">
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

      <button onClick={createCustomer}>Submit</button>
    </form>
  );
}

export default CustomerForm;
