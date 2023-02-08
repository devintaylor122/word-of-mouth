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
import { getAuth } from "firebase/auth";

const CustomerDashboard = (props) => {
  console.log("i dont get it");
  // const { anyUser } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  const customerId = user.uid;
  const setFavOwners = props.setFavOwners;
  const filterOwners = props.filterOwners;

  const customerRef = collection(db, "customers");
  const q = query(customerRef, where("uid", "==", customerId));
  console.log("q", q);
  // const customers = props.customersList;
  console.log("LOOk", customerId);
  // const singleCustomer = props.customersList.find(
  //   (customer) => customer.uid === customerId
  // );
  console.log("FAV", props.customersList);
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
  //  //--------------------------------FILTER--------------------------------

  //  const filterOwners = async (filterType, inputIndustry) => {
  //   console.log("in filterOwners. Filtered word= ", inputIndustry);
  //   // setDisplayOwners(ownersList);
  //   console.log("unfiltered Owners: ", ownersList);
  //   const filteredOwnersList = [];
  //   const q = await query(
  //     ownersCollectionRef,
  //     where(filterType, "array-contains", inputIndustry /*.toLowerCase()*/)
  //   );

  //   await onSnapshot(q, (snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       filteredOwnersList.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log("filtered Owners: ", filteredOwnersList);
  //     if (filteredOwnersList.length > 0) {
  //       setDisplayOwners(filteredOwnersList);
  //     } else {
  //       setDisplayOwners(ownersList);
  //     }
  //   });
  //   console.log("length", filteredOwnersList.length);
  // };

  // //--------------------------------------------------------------------
  // console.log("user id", anyUser.uid);
  return (
    <div>
      <h2>Your Favorite Services</h2>
      <div>{displayFavorites}</div>
      {/* <ServiceProvidersList ownersList={ownersList} /> */}
    </div>
  );
};

export default CustomerDashboard;
