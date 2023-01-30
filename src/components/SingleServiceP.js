import { Link, useParams } from "react-router-dom";
// import ServiceProvider from './ServiceProvider';
import ServiceProvidersList from "./ServiceProvidersList";

const SingleServiceP = () => {
  const { SPId } = useParams();
  
  const singleServiceProvider = ServiceProvidersList.find(
    (serviceProvider) => serviceProvider.id === SPId
  );
  console.log("SEE",singleServiceProvider)
  const { company, email, hours, industry, owner, phone, specialty } =
    singleServiceProvider;

  const specialtyDisplay = specialty ? `Specialty: ${specialty}` : "";

  return (
    <section className="section product">
      {/* <img src={image} alt={name} /> */}
      <h5>
        {company} - {industry}
      </h5>
      <div>
        <p>Owner Name: {owner}</p>
        <p>{specialtyDisplay}</p>
        <p>Hours: {hours}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
      <Link to="/ServiceProvidersList">back to all Service Providers</Link>
    </section>
  );
};

export default SingleServiceP;
