import "./App.css";
import { db } from "./firebaseconfig.js";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import OwnerForm from "./components/OwnerForm";
import CustomerForm from "./components/CustomerForm";
import OwnerLogin from "./components/OwnerLogin";
import CustomerLogin from "./components/CustomerLogin";
import CustomerDashboard from "./components/CustomerDashboard";
import SingleServiceP from "./components/SingleServiceP";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerCreateAccount from "./components/OwnerCreateAccount";
import Error from "./components/Error";

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
import CustomerCreateAccount from "./components/CustomerCreateAccount";

function App() {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  // const login = async () => {
  //   try {
  //     // this will create a new user in our authentication in firbase and at the same time in will log you in
  //     const user = await signInWithEmailAndPassword(
  //       auth,
  //       loginEmail,
  //       loginPassword
  //     );
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const logout = async () => {
    await signOut(auth);
  };

  const [serviceProviderList, setServiceProviderList] = useState([]);

  const ownersCollectionRef = collection(db, "owners");
  const customersCollectionRef = collection(db, "customers");
  // console.log("usersCollectionRef", usersCollectionRef);
  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, { name: newName, age: parseInt(newAge) }); //takes in two things, reference to collection and object containing data/payload that we're adding
  // };
  const createOwner = async (
    newCompany,
    newOwner,
    newPhone,
    newIndustry,
    newSpecialty,
    newHours
  ) => {
    console.log("In createOwner");
    await addDoc(ownersCollectionRef, {
      company: newCompany,
      owner: newOwner,
      phone: parseInt(newPhone),
      // email: newEmail,
      industry: newIndustry,
      specialty: newSpecialty,
      hours: newHours,
    });
  };

  // const createOwner = async () => {
  //   console.log("Hello");
  //   await addDoc(usersCollectionRef, {
  //     company: newCompany,
  //     owner: newOwner,
  //     phone: parseInt(newPhone),
  //     // email: registerEmail,
  //     industry: newIndustry,
  //     specialty: newSpecialty,
  //     hours: newHours,
  //   });
  //   console.log("Thank you for coming");
  // };

  // useEffect is called everytime page renders, don't async useEffect - bad practice
  useEffect(() => {
    //async function (other option: .then, .catch)
    const getServiceProviders = async () => {
      // console.log("XHELLOOOOO");
      const data = await getDocs(ownersCollectionRef);

      setServiceProviderList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      ); //doc.data access object that contains name and age
      // console.log("data HELLOOOOO", data);
    };
    getServiceProviders();
  }, []);
  // console.log("SERVICE PROVIDERS", serviceProviderList);
  // const toggleDisplay = async (id, displayStatus) => {
  //   const ownerDoc = doc(db, "owners", id);
  //   await updateDoc(ownerDoc, { display: !displayStatus });
  //   const data = await getDocs(usersCollectionRef);
  //   setServiceProviderList(
  //     data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   );
  // };
  // console.log(user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/OwnerForm"
            element={<OwnerForm createOwner={createOwner} />}
          />
          <Route path="/CustomerForm" element={<CustomerForm />} />
          <Route path="/OwnerCreateAccount" element={<OwnerCreateAccount />} />
          <Route
            path="/CustomerCreateAccount"
            element={<CustomerCreateAccount />}
          />
          <Route
            path="/OwnerLogin"
            element={<OwnerLogin setAUser={setUser} />}
          />
          <Route path="/OwnerLogin" element={<OwnerLogin />} />
          <Route path="/CustomerLogin" element={<CustomerLogin />} />
          <Route
            path="/CustomerDashboard"
            // state={{ ServiceProvidersList: serviceProviderList }}
            element={
              <ProtectedRoute user={user}>
                <CustomerDashboard props={{ serviceProviderList }} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CustomerDashboard/:SPId"
            element={<SingleServiceP serviceProviders={serviceProviderList} />}
          />
          {/* <Route path="/CustomerDashboard" */}
          {/* <Route path="*" element={<Error />} />
          {/* <Route path="/" element={<SharedLoggedOutLayout />}>
            <Route index element={<Home />} />
            <Route path="customerform" element={<CustomerForm />} />
            <Route path="ownerform" element={<OwnerForm />} />
          </Route>
          <Route path="/customerdash" element={<SharedCustLayout/>}>
            <Route index element ={
              <ProtectedRoute customer={customer}>
                <CustomerDash customer={customer} />
              </ProtectedRoute>
            } />
            <Route path="/serviceproviders" element ={
              <ProtectedRoute customer={customer}>
                <ServiceProvidersList customer={customer} />
              </ProtectedRoute>
            } />
            <Route path="/serviceproviders/:SPid" element ={
              <ProtectedRoute customer={customer}>
                <SingleServiceP customer={customer} />
              </ProtectedRoute>
            } />
            <Route path="/messages" element ={
              <ProtectedRoute customer={customer}>
                <Messages customer={customer} />
              </ProtectedRoute>
            } />
            <Route path="/messages/:Cid" element ={
              <ProtectedRoute customer={customer}>
                <Messages customer={customer} />
              </ProtectedRoute>
            } />
            </Route>

            <Route path="/ownerdash" element={<SharedOwnerLayout/>}>
            <Route index element ={
              <ProtectedRoute owner={owner}>
                <OwnerDash owner={owner} />
              </ProtectedRoute>
            } />
            <Route path="/edit" element ={
              <ProtectedRoute owner={owner}>
                <Edit owner={owner} />
              </ProtectedRoute>
            }/>
            <Route path="/messages" element ={
              <ProtectedRoute owner={owner}>
                <Messages owner={owner} />
              </ProtectedRoute>
            } />
            <Route path="/messages/:SPid" element ={
              <ProtectedRoute owner={owner}>
                <Messages owner={owner} />
              </ProtectedRoute>
            } />
            </Route>  */}
        </Routes>
      </Router>
      <button className="logout" onClick={logout}>
        {" "}
        Sign Out
      </button>
    </div>
  );
}
export default App;
