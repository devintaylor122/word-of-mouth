import { db } from "../firebaseconfig.js";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Dropdown from "./Dropdown.js";
import Tags from "./Tags.js";
import "./OwnerForm.css";
import { useNavigate } from "react-router-dom";
// import { storage } from "./firebase";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import {v4} from 'uuid'

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
  const [newTag, setNewTag] = useState([]);
  // const usersCollectionRef = collection(db, "owners");
  const createOwner = props.createOwner;
  const navigate = useNavigate();
  // const [imageUpload, setImageUpload] = useState(null);
  // const [imageList, setImageList] = useEffect([])
  // const imageListRef = ref(storage, "images/")
  //   const uploadImage = () => {
  //     if (imageUpload == null) return;
  //     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //     uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //    getDownloadURL(snapshot.ref).then((url) => {
  //       setImageBytes((prev) => [...prev, url])

  // })
  // });
  // };
  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     console.log(response)
  //      response.items.forEach((item)=> {
  //   getDowloadURL(item).then((url) => {
  // setImageList((prev) => [...prev, url])

  // })

  // })
  //   })

  // }, []);
  const submitHandler = () => {
    createOwner(
      newCompany,
      newOwner,
      newPhone,
      newIndustry,
      newSpecialty,
      newHours,
      newTag,
      mobile
    );
    navigate("/owner/dash");
  };

  return (
    //  uploading image, this will need to be added to the OwnerForm
    // <div>
    //   <input type="file" onChange={(event)=> {
    //     setImageUpload(event.target.files[0]);
    //     }} />
    //   <button onClick={uploadImage}> Upload Image</button>
    //  {imageList.map((url) => {
    //    return <img src={url}/>
    // })}
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
        <Tags
          isMulti
          placeHolder="Tag(s)..."
          options={Tags.options}
          onChange={(event) => {
            const tagsList = event.map((ind) => ind);
            setNewTag(tagsList);
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
            submitHandler();
          }}
        >
          {" "}
          Submit
        </button>
      </div>
    </div>
    // </div>
  );
}

export default OwnerForm;
