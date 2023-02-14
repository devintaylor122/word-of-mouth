import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import EditOwner from "./EditOwner";
import useAuth from "../hooks/useAuth";
import { getAuth } from "firebase/auth";
import { storage } from "../firebaseconfig";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import "./SingleServiceProvider.css";

function OwnerDash(props) {
  const navigate = useNavigate();
  // const { anyUser } = useAuth();
  // const { OId } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  let userId;
  if (user) {
    userId = user.uid;
    console.log("userId: ", userId);
  } else {
    console.warn("User is null or undefined");
  }
  // const OId = o.uid;
  const deleteUser = props.deleteUser;

  console.log("OID", userId);
  const owners = props.owners;
  console.log("owners", owners);
  // const { SPId } = useParams();

  // console.log("SPL", serviceProviders);
  console.log("this is a", userId);
  // console.log("this is a", owner)

  const singleOwner = owners.find((owner) => owner.uid === userId);
  console.log("singleOwner", singleOwner);
  const {
    name,
    email,
    hours,
    industry,
    specialty,
    owner,
    phone /*profileImage*/,
    uid,
    tag,
  } = singleOwner;
  console.log("actual id", singleOwner.id);

  const imagesListRef = ref(storage, `${uid}/`);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (imageUrls.includes(url) === false) {
            setImageUrls((prev) => [...prev, url]);
            console.log("URLS", imageUrls);
          }
        });
      });
    });
  }, []);

  const uniqueImageList = [...new Set(imageUrls)];

  return (
    <section className="sectionOwner">
      {/* <img src={image} alt={name} /> */}
      <h2 className="companyNameDisplay">
        {name} - {industry}
      </h2>
      <button
        id="editButton"
        onClick={() => {
          navigate("/owner/edit");
        }}
      >
        {" "}
        Edit info
      </button>

      <button
        id="deleteButton"
        onClick={() => deleteUser(singleOwner.id, navigate)}
      >
        Delete Account
      </button>
      <div className="ownerInfoDisplay">
        <p className="ownerNameDisplay">Owner Name: {owner}</p>
        <p className="specialtyDisplay">{specialty}</p>
        <p className="hoursDisplay">Hours: {hours}</p>
        <p iclassName="phoneDisplay">Phone: {phone}</p>
        <p className="tags">Tag(s): {tag}</p>
        <div className="imagesDisplay">
          {uniqueImageList.map((url) => {
            return <img className="imageDisplay" alt="userImage" src={url} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default OwnerDash;
