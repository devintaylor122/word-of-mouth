import { Link, useParams } from "react-router-dom";
// import ServiceProvider from './ServiceProvider';
import ServiceProvidersList from "./ServiceProvidersList";
import useAuth from "../hooks/useAuth";

const SingleServiceP = (props) => {
  const { anyUser } = useAuth();
  const updateFav = props.updateFav;
  const serviceProviders = props.ownersList;
  const customers = props.customersList;
  const { SPId } = useParams();

  // console.log("SPL", serviceProviders);
  const singleServiceProvider = serviceProviders.find(
    (serviceProvider) => serviceProvider.id === SPId
  );
  console.log("CUSTOMERSSSS", customers);
  const singleCustomer = customers.find(
    (customer) => customer.uid === anyUser.uid
  );
  // console.log("SEE", singleServiceProvider.favOwners);
  // const isFavorite = singleServiceProvider.isFavorite;
  console.log("SINGLE CUST ", singleCustomer);
  const { company, email, hours, industry, owner, phone, specialty } =
    singleServiceProvider;

  const specialtyDisplay = specialty ? `Specialty: ${specialty}` : "";

  // let buttonContent = isFavorite ? "Favorited 💗" : "Favorite 🤍";
  let buttonContent = singleCustomer.favOwners.includes(
    singleServiceProvider.id
  )
    ? "Favorited 💗"
    : "Favorite 🤍";
  // let buttonContent = "";

  // const toggleFav = async () => {
  //   await updateFav(SPId, isFavorite);
  //   buttonContent = isFavorite ? "Favorited 💗" : "Favorite 🤍";
  // };
  const toggleFav = async () => {
    await updateFav(
      singleCustomer.id,
      singleServiceProvider.id,
      singleCustomer.favOwners
    );
    buttonContent = singleCustomer.favOwners.includes(singleServiceProvider.id)
      ? "Favorited 💗"
      : "Favorite 🤍";
  };

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
        <button
          onClick={() => {
            toggleFav();
          }}
        >
          {buttonContent}
        </button>
      </div>
      <Link to="/customer/list">back to all Service Providers</Link>
    </section>
  );
};

export default SingleServiceP;
