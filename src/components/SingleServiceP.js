import { Link, useParams } from "react-router-dom";
// import ServiceProvider from './ServiceProvider';
import ServiceProvidersList from "./ServiceProvidersList";

const SingleServiceP = (props) => {
  const updateFav = props.updateFav;
  const serviceProviders = props.ownersList;
  const { SPId } = useParams();
  // console.log("SPL", serviceProviders);
  const singleServiceProvider = serviceProviders.find(
    (serviceProvider) => serviceProvider.id === SPId
  );
  console.log("SEE", singleServiceProvider.isFavorite);
  const isFavorite = singleServiceProvider.isFavorite;

  const { company, email, hours, industry, owner, phone, specialty } =
    singleServiceProvider;

  const specialtyDisplay = specialty ? `Specialty: ${specialty}` : "";

  let buttonContent = isFavorite ? "Favorited 💗" : "Favorite 🤍";
  // let buttonContent = "";

  // function changeLikes(isFavorite) {
  //   if (!isFavorite) {
  //     updateFav(SPId);
  //   }
  // }
  const toggleFav = async () => {
    await updateFav(SPId, isFavorite);
    buttonContent = isFavorite ? "Favorited 💗" : "Favorite 🤍";
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
