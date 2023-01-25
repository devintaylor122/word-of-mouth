//need to take in serviceProviderList as a prop from ServiceProviderList component
//possibly need to put a function for displaying owner info in App.js?????
import PropTypes from "prop-types";
import "./ServiceProvider.css";

function ServiceProvider(props) {
  const companyName = props.serviceProviderList.companyName;
  const contactEmail = props.serviceProviderList.contactEmail;
  const contactNumber = props.serviceProviderList.contactNumber;
  const display = props.serviceProviderList.display;
  const hours = props.serviceProviderList.hours;
  const industry = props.serviceProviderList.industry;
  const ownerName = props.serviceProviderList.ownerName;
  const specialty = props.serviceProviderList.specialty;

  let ownerInfo = "";
  const specialtyDisplay = specialty ? `Specialty: ${specialty}` : "";

  function displayOwnerInfo(displayStatus) {
    if (displayStatus === true) {
      displayStatus = false;
      displayStatus = "";
    } else {
      displayStatus = true;
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
      <button onClick={() => displayOwnerInfo(display)}>
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
