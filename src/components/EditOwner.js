import { useState } from "react";
import "../App.css";
import Dropdown from "./Dropdown.js";
import Tags from "./Tags";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./OwnerForm.css";

const EditOwner = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const ownerId = user.uid;
  const update = props.update;
  const ownersList = props.ownersList;

  const owner = ownersList.find(
    (serviceProvider) => serviceProvider.uid === ownerId
  );
  const navigate = useNavigate();

  const [updatedCompany, setCompany] = useState(owner.company);
  const [updatedOwner, setOwner] = useState(owner.owner);
  const [updatedPhone, setPhone] = useState(owner.phone);
  const [updatedIndustry, setIndustry] = useState(owner.industry);
  const [updatedSpecialty, setSpecialty] = useState(owner.specialty);
  const [updatedHours, setHours] = useState(owner.hours);
  const [updateTag, setTag] = useState(owner.tag);
  const [updatedMobile, setMobile] = useState(owner.mobile);

  return (
    <div>
      <h3> Update Service Provider</h3>
      <div>
        <input
          placeholder="Company Name..."
          onChange={(event) => {
            setCompany(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Owner Name..."
          onChange={(event) => {
            setOwner(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Phone number (no spaces)"
          onChange={(event) => {
            setPhone(event.target.value);
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
            setIndustry(industryList);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Specialty/Specialties"
          onChange={(event) => {
            setSpecialty(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Hours..."
          onChange={(event) => {
            setHours(event.target.value);
          }}
        />
      </div>

      <div>
        <Tags
          isMulti
          placeHolder="Tag(s)..."
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
            update(
              owner.id,
              updatedCompany,
              updatedOwner,
              updatedPhone,
              updatedIndustry,
              updatedSpecialty,
              updatedHours,
              updatedMobile,
              updateTag,
              navigate
            );
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
