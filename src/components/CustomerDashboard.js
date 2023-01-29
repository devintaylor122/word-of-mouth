import { db } from "../firebaseconfig.js";
import ServiceProvidersList from "./ServiceProvidersList";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const CustomerDashboard = (props) => {
  const [serviceProviderList, setServiceProviderList] = useState([]);

  const usersCollectionRef = collection(db, "owners");
  console.log("usersCollectionRef", usersCollectionRef);

  // useEffect is called everytime page renders, don't async useEffect - bad practice
  useEffect(() => {
    //async function (other option: .then, .catch)
    const getServiceProviders = async () => {
      console.log("XHELLOOOOO");
      const data = await getDocs(usersCollectionRef);

      setServiceProviderList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      ); //doc.data access object that contains name and age
      console.log("data HELLOOOOO", data);
    };
    getServiceProviders();
  }, []);
  console.log("SERVICE PROVIDERS", serviceProviderList);

  // const serviceProviders = useLocation();
  // console.log(props, "props");
  // console.log(serviceProviders, "UseLocation Hook");
  // const data = serviceProviders.state?.data;
  // console.log(data);
  return (
    <div>
      <ServiceProvidersList
        state={{ ServiceProvidersList: serviceProviderList }}
      />
      <p>what</p>
    </div>
  );
};

export default CustomerDashboard;
