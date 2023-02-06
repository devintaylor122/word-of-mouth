import { useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import Dropdown from "./Dropdown.js";
import Tags from "./Tags";
import { updateDoc, doc } from "firebase/firestore";

const EditOwner = (props) => {
  const [updatedCompany, setCompany] = useState(props.owner.company);
  const [updatedOwner, setOwner] = useState(props.owner.owner);
  const [updatedPhone, setPhone] = useState(props.owner.phone);
  const [updatedIndustry, setIndustry] = useState(props.owner.industry);
  const [updatedSpecialty, setSpecialty] = useState(props.owner.specialty);
  const [updatedHours, setHours] = useState(props.owner.hours);
  const [updateTag, setTag] = useState(props.owner.tag);
  const [updatedMobile, setMobile] = useState(props.owner.mobile);

  const update = async (id) => {
    const ownerDoc = doc(db, "owners", id);

    const updatedData = {
      company: updatedCompany,
      owner: updatedOwner,
      phone: parseInt(updatedPhone),
      industry: updatedIndustry,
      specialty: updatedSpecialty,
      hours: updatedHours,
      mobile: updatedMobile,
      tag: updateTag,
    };
    await updateDoc(ownerDoc, updatedData);
  };

  return (
    <div>
      <h3> Update Service Provider</h3>
      <div>
        <input
          // placeholder="Company Name..."
          onChange={(event) => {
            setCompany(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          // placeholder="Owner Name..."
          onChange={(event) => {
            setOwner(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          // placeholder="Phone number (no spaces)"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
      </div>
      <div>
        <Dropdown
          isMulti
          // placeHolder="Industry..."
          options={Dropdown.options}
          onChange={(event) => {
            const industryList = event.map((ind) => ind);
            setIndustry(industryList);
          }}
        />
      </div>

      <div>
        <input
          // placeholder="Specialty/Specialties"
          onChange={(event) => {
            setSpecialty(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          // placeholder="Hours..."
          onChange={(event) => {
            setHours(event.target.value);
          }}
        />
      </div>

      <div>
        <Tags
          isMulti
          // placeHolder="Tag(s)..."
          options={Tags.options}
          onChange={(event) => {
            const tagList = event.map((ind) => ind);
            setTag(tagList);
          }}
        />
      </div>

      <div>
        <input
          type="radio"
          name="mobile"
          value="Mobile"
          checked={updatedMobile === "Mobile"}
          onChange={(event) => {
            setMobile(event.target.value);
          }}
        />
        <label>Mobile</label>

        <input
          type="radio"
          name="mobile"
          value="Not Mobile"
          checked={updatedMobile === "Not Mobile"}
          onChange={(event) => {
            setMobile(event.target.value);
          }}
        />
        <label>Not Mobile</label>
      </div>

      <div>
        <button
          onClick={() => {
            update(props.user.id);
          }}
        >
          {" "}
          Update Info
        </button>
      </div>
    </div>
  );
};

export default EditOwner;
