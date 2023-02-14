import { Link, useParams } from "react-router-dom";
// import ServiceProvider from './ServiceProvider';
import ServiceProvidersList from "./ServiceProvidersList";
import useAuth from "../hooks/useAuth";
import { storage } from "../firebaseconfig";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import "./SingleServiceProvider.css";

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
  const { name, email, hours, industry, owner, phone, specialty, uid, tag } =
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
      <h5>
        {name} - {industry}
      </h5>
      <div id="ownerInfoDisplay">
        <p id="ownerNameDisplay">Owner Name: {owner}</p>
        <p id="specialtyDisplay">{specialtyDisplay}</p>
        <p id="hoursDisplay">Typical Hours: {hours}</p>
        <p id="phoneDisplay">Phone: {phone}</p>
        <p id="tags">Tag(s): {tag}</p>
        <div id="imagesDisplay">
          {uniqueImageList.map((url) => {
            console.log("UNIQUEimageul", uniqueImageList);
            return <img alt="userImage" src={url} />;
          })}
        </div>
        <button
          id="favButton"
          onClick={() => {
            toggleFav();
          }}
        >
          {buttonContent}
        </button>
      </div>
      {/* <Link to="/customer/list">back to all Service Providers</Link> */}
    </section>
  );
};

export default SingleServiceP;
