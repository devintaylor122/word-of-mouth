import "./App.css";
import { db } from "./firebaseconfig.js";
import { useState, useEffect } from "react";
import OwnerForm from "./components/OwnerForm";
import ServiceProvidersList from "./components/ServiceProvidersList";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  console.log(db);
  const [serviceProviderList, setServiceProviderList] = useState([]);

  const usersCollectionRef = collection(db, "owners");

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, { name: newName, age: parseInt(newAge) }); //takes in two things, reference to collection and object containing data/payload that we're adding
  // };
  // const createOwner = async (newCompany, newOwner, newPhone, newEmail, newSpecialty, newHours) => {
  //   await addDoc(usersCollectionRef, {
  //     Company: newCompany,
  //     Owner: newOwner,
  //     Phone: parseInt(newPhone),
  //     Email: newEmail,
  //     //Industry: newIndustry,
  //     Specialty: newSpecialty,
  //     Hours: newHours,
  //   });
  // };

  //useEffect is called everytime page renders, don't async useEffect - bad practice
  // useEffect(() => {
  //   //async function (other option: .then, .catch)
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //doc.data access object that contains name and age
  //     console.log(data);
  //   };
  //   getUsers();
  // }, []);

  return (
    <div className="App">
      <ServiceProvidersList industriesList={serviceProviderList} />
      <OwnerForm /*createOwner={createOwner}*/></OwnerForm>
    </div>
  );
}

export default App;
