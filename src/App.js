import "./App.css";
import { db } from "./firebaseconfig.js";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import OwnerForm from "./components/OwnerForm";
import CustomerForm from "./components/CustomerForm";
import OwnerLogin from "./components/OwnerLogin";
import CustomerLogin from "./components/CustomerLogin";

import ServiceProvidersList from "./components/ServiceProvidersList";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ReactDOM } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseconfig";

function App() {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [user, setUser] = useState({});

  const login = async () => {
    try {
      // this will create a new user in our authentication in firbase and at the same time in will log you in
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

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

  // useEffect is called everytime page renders, don't async useEffect - bad practice
  useEffect(() => {
    //async function (other option: .then, .catch)
    const getServiceProviders = async () => {
      const data = await getDocs(usersCollectionRef);
      setServiceProviderList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      ); //doc.data access object that contains name and age
      // console.log("data", data);
    };
    getServiceProviders();
  }, []);

  const toggleDisplay = async (id, displayStatus) => {
    const ownerDoc = doc(db, "owners", id);
    await updateDoc(ownerDoc, { display: !displayStatus });
    const data = await getDocs(usersCollectionRef);
    setServiceProviderList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  return (
    <div className="App">
      <Router>
        {/* <nav>
          <Link to="/"> HOME </Link>
          <Link to="/OwnerForm">OWNER SIGN-UP</Link>
          <Link to="/CustomerForm"> CUSTOMER SIGN-IN </Link>
          <Link to="/OwnerLogin"> OWNER LOG-IN </Link>
          <Link to="/CustomerLogin"> CUSTOMER LOG-IN </Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OwnerForm" element={<OwnerForm />} />
          <Route path="/CustomerForm" element={<CustomerForm />} />
          <Route path="/OwnerLogin" element={<OwnerLogin />} />
          <Route path="/CustomerLogin" element={<CustomerLogin />} />
        </Routes>
      </Router>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}> Login</button>
      </div>

      {/* <h4> User Logged In: </h4>
        {user?.email} */}

      <button onClick={logout}> Sign Out</button>
    </div>
  );

  //   <div className="App">
  //     <ServiceProvidersList
  //       toggleDisplay={toggleDisplay}
  //       industriesList={serviceProviderList}
  //     />
  //     <OwnerForm /*createOwner={createOwner}*/></OwnerForm>
  //   </div>
  // );
}

export default App;
