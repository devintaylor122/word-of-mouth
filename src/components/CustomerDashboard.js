import PropTypes from "prop-types";
import { db } from "../firebaseconfig.js";
import ServiceProvidersList from "./ServiceProvidersList";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import ServiceProvider from "./ServiceProvider.js";
import useAuth from "../hooks/useAuth";

const CustomerDashboard = (props) => {
  const { anyUser } = useAuth();
  console.log(anyUser);
  console.log("i dont get it");
  // const { anyUser } = useAuth();

  // const customerId = anyUser.uid;
  const setFavOwners = props.setFavOwners;
  const filterOwners = props.filterOwners;

  // const customers = props.customersList;
  // console.log("LOOk", customerId);
  // const singleCustomer = props.customers.find(
  //   (customer) => customer.uid === customerId
  // );
  // console.log("FAV", props.customersList);
  const displayFavorites = "hi";
  // const displayFavorites = singleCustomer.favOwners
  //   ? singleCustomer.favOwners.map((ind) => (
  //       <article key={ind.id}>
  //         <Link to={`/customer/list/${ind.id}`}>
  //           <ServiceProvider
  //             serviceProviderList={props.industriesList}
  //             data={ind}
  //             toggleDisplay={props.toggleDisplay}
  //           ></ServiceProvider>
  //         </Link>
  //       </article>
  //     ))
  //   : "NOTHING FAVORITED YET";

  // useEffect(() => {
  //   const filterFavs = async () => {
  //     await filterOwners("isFavorite", "==", true, setFavOwners);
  //   };
  //   filterFavs();
  //   console.log("WELL now...", displayFavorites);
  // }, []);
  // const displayFavorites = ""
  // const { ownersList } = props.ownersList;
  //
  // console.log("user id", anyUser.uid);
  return (
    <div>
      <h2>Your Favorite Services</h2>
      <div>{displayFavorites}</div>
      {/* <ServiceProvidersList ownersList={ownersList} /> */}
    </div>
  );
};
CustomerDashboard.propTypes = {
  customers: PropTypes.array.isRequired,
};

export default CustomerDashboard;
