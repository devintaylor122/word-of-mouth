import { db } from "../firebaseconfig.js";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Dropdown from "./Dropdown.js";
import "./OwnerForm.css";
import { Link } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebaseconfig";

function OwnerForm(props) {
  const [newCompany, setNewCompany] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newIndustry, setNewIndustry] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newHours, setNewHours] = useState("");
  const [mobile, setMobile] = useState("Not Mobile");
  // const usersCollectionRef = collection(db, "owners");
  const createOwner = props.createOwner;

  return (
    <div>
      <h3> Register Service Provider</h3>
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
          placeholder="Phone number (no spaces)"
          onChange={(event) => {
            setNewPhone(event.target.value);
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
        <input
          type="radio"
          name="mobile"
          value="Mobile"
          checked={mobile === "Mobile"}
          onChange={(event) => {
            setMobile(event.target.value);
          }}
        />
        <label>Mobile</label>

        <input
          type="radio"
          name="mobile"
          value="Not Mobile"
          checked={mobile === "Not Mobile"}
          onChange={(event) => {
            setMobile(event.target.value);
          }}
        />
        <label>Not Mobile</label>
      </div>
      {/* <div>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
      </div> */}
      {/* <div>
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
      </div> */}
      {/* <button onClick={createOwner}>Submit</button> */}
      <div>
        {/* <h3> Service Provider Sign Up</h3> */}
        {/* <input placeholder="Email..." onChange={(event) => {setRegisterEmail(event.target.value)}}/> */}
        <button
          onClick={() => {
            createOwner(
              newCompany,
              newOwner,
              newPhone,
              newIndustry,
              newSpecialty,
              newHours,
              mobile
            );
          }}
        >
          {" "}
          Submit
        </button>
      </div>
    </div>
    // </form>
  );
}

export default OwnerForm;
