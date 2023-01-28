import { db } from "../firebaseconfig.js";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Dropdown from "./Dropdown.js";
import "./OwnerForm.css";
import { Link } from "react-router-dom";
import{ createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import{ auth } from '../firebaseconfig';

function OwnerForm() {
  const [newCompany, setNewCompany] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [newIndustry, setNewIndustry] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newHours, setNewHours] = useState("");
  const usersCollectionRef = collection(db, "owners");
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

  const createOwner = async () => {
    await addDoc(usersCollectionRef, {
      company: newCompany,
      owner: newOwner,
      phone: parseInt(newPhone),
      email: newEmail,
      industry: newIndustry,
      specialty: newSpecialty,
      hours: newHours,
    });
  };

  return (
    <form className="form">
      <div>
        <input
          placeholder="Company Name..."
          onChange={(event) => {
            setNewCompany(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Owner Name..."
          onChange={(event) => {
            setNewOwner(event.target.value);
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

      <div>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
      </div>

      <div>
        <Dropdown
          isMulti
          placeHolder="Industry..."
          options={Dropdown.options}
          onChange={(event) => {
            const industryList = event.map((ind) => ind);
            setNewIndustry(industryList);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Specialty/Specialties"
          onChange={(event) => {
            setNewSpecialty(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Hours..."
          onChange={(event) => {
            setNewHours(event.target.value);
          }}
        />
      </div>
      <div>
          <h3> Register Service Provider</h3>
          <input placeholder="Email..." onChange={(event) => {setRegisterEmail(event.target.value)}}/>
          <input placeholder="Password..." onChange={(event) => {setRegisterPassword(event.target.value)}}/>
          <button onClick={register}> Create Service Provider</button>
        </div>

      <button onClick={createOwner}>Submit</button>
    </form>
  );
}

export default OwnerForm;
