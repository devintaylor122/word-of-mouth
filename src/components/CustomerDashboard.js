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
} from "firebase/firestore";
import ServiceProvider from "./ServiceProvider.js";

const CustomerDashboard = (props) => {
  const setFavOwners = props.setFavOwners;
  const filterOwners = props.filterOwners;

  const displayFavorites = props.favOwners.map((ind) => (
    <article key={ind.id}>
      <Link to={`/customer/list/${ind.id}`}>
        <ServiceProvider
          serviceProviderList={props.industriesList}
          data={ind}
          toggleDisplay={props.toggleDisplay}
        ></ServiceProvider>
      </Link>
    </article>
  ));
  console.log("UH HELLO", displayFavorites);

  useEffect(() => {
    const filterFavs = async () => {
      await filterOwners("isFavorite", "==", true, setFavOwners);
    };
    filterFavs();
    console.log("WELL now...", displayFavorites);
  }, []);
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

  return (
    <div>
      <div>{displayFavorites}</div>
      {/* <ServiceProvidersList ownersList={ownersList} /> */}
    </div>
  );
};

export default CustomerDashboard;
