import { db } from "./firebaseconfig.js";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

function OwnerForm() {
  const [newCompany, setNewCompany] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newHours, setNewHours] = useState("");
  const usersCollectionRef = collection(db, "owners");

  const createOwner = async () => {
    await addDoc(usersCollectionRef, {
      Company: newCompany,
      Owner: newOwner,
      Phone: parseInt(newPhone),
      Email: newEmail,
      Industry: newIndustry,
      Specialty: newSpecialty,
      Hours: newHours,
    });
  };

  return (
    <form>
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

      <div className="App">
        <Dropdown placeHolder="Select..." />
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

      <button onClick={createOwner}>Submit</button>
    </form>
  );
}

export default OwnerForm;
