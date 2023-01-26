//need to take in serviceProviderList as a prop from ServiceProviderList component
//possibly need to put a function for displaying owner info in App.js?????
import PropTypes from "prop-types";
import "./ServiceProvider.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseconfig.js";

function ServiceProvider(props) {
  const companyName = props.data.company;
  const contactEmail = props.data.email;
  const contactNumber = props.data.phone;
  const display = props.data.display;
  const hours = props.data.hours;
  const industry = props.data.industry;
  const ownerName = props.data.owner;
  const specialty = props.data.specialty;
  const id = props.data.id;

  let ownerInfo = "";
  const specialtyDisplay = specialty ? `Specialty: ${specialty}` : "";

  // function displayOwnerInfo(displayStatus) {
  //   if (displayStatus === true) {
  //     displayStatus = false;
  //     displayStatus = "";
  //   } else {
  //     displayStatus = true;
  //     ownerInfo = (
  //       <div>
  //         <p>Owner Name: {ownerName}</p>
  //         <p>{specialtyDisplay}</p>
  //         <p>Hours: {hours}</p>
  //         <p>Email: {contactEmail}</p>
  //         <p>Number: {contactNumber}</p>
  //       </div>
  //     );
  //   }
  // }
  const toggleDisplay = async (id, displayStatus) => {
    const ownerDoc = doc(db, "owners", id);
    const newFields = { display: !displayStatus };
    await updateDoc(ownerDoc, newFields);
  };

  function displayOwnerInfo(id, displayStatus) {
    toggleDisplay(id, displayStatus);
    if (displayStatus === true) {
      ownerInfo = "";
    } else {
      ownerInfo = (
        <div>
          <p>Owner Name: {ownerName}</p>
          <p>{specialtyDisplay}</p>
          <p>Hours: {hours}</p>
          <p>Email: {contactEmail}</p>
          <p>Number: {contactNumber}</p>
        </div>
      );
    }
  }

  return (
    <div>
      <button onClick={() => displayOwnerInfo(id, display)}>
        {companyName}-{industry}
      </button>
      <div>{ownerInfo}</div>
    </div>
  );
}
ServiceProvider.propTypes = {
  serviceProviderList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      contactEmail: PropTypes.string.isRequired,
      contactNumber: PropTypes.number.isRequired,
      display: PropTypes.bool.isRequired,
      hours: PropTypes.string.isRequired,
      industry: PropTypes.string.isRequired,
      ownerName: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
    })
  ),
};

export default ServiceProvider;
