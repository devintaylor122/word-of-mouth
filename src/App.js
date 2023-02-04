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
  query,
  where,
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
import SharedLoggedOutLayout from "./components/SharedLoggedOutLayout";
import SharedCustLayout from "./components/SharedCustLayout";
import SharedOwnerLayout from "./components/SharedOwnerLayout";

function App() {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [owner, setOwner] = useState({});
  const [customer, setCustomer] = useState({});

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

  const [ownersList, setOwnersList] = useState([]);

  const ownersCollectionRef = collection(db, "owners");
  const customersCollectionRef = collection(db, "customers");

  const createOwner = async (
    newCompany,
    newOwner,
    newPhone,
    newIndustry,
    newSpecialty,
    newHours,
    mobile
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
      mobile: mobile,
    });
  };
  //--------------------------------NEED TO FIX--------------------------------
  const filterOwners = async (inputIndustry, ownersList) => {
    const customerIndQuery = query(
      collection(db, "owners"),
      where("industry", "==", inputIndustry) //lower-caseify inputIndustry
      //could set a limit if app grows (ex: limit(10))
    );
    ownersList = [];
    const querySnapshot = await getDocs(customerIndQuery);
    const allDocs = querySnapshot.forEach((snap) => {
      ownersList.push(snap.data());
      console.log("In filterOwners. Data= ", snap.data);
    });
  };
  //-----------------------------------------------------------------------------
  // useEffect is called everytime page renders, don't async useEffect - bad practice
  useEffect(() => {
    //async function (other option: .then, .catch)
    const getOwners = async () => {
      // console.log("XHELLOOOOO");
      const data = await getDocs(ownersCollectionRef);

      setOwnersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //doc.data access object that contains name and age
      // console.log("data HELLOOOOO", data);
    };
    getOwners();
    console.log("Owners: ", ownersList);
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
  console.log("THE CUSTOMER: ", customer);
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<SharedLoggedOutLayout />}>
            <Route index element={<Home />} />
            <Route
              path="OwnerForm"
              element={<OwnerForm createOwner={createOwner} />}
            />
            <Route path="CustomerForm" element={<CustomerForm />} />
            <Route path="OwnerCreateAccount" element={<OwnerCreateAccount />} />
            <Route
              path="CustomerCreateAccount"
              element={<CustomerCreateAccount />}
            />
            <Route
              path="OwnerLogin"
              element={<OwnerLogin setAUser={setOwner} />}
            />
            {/* <Route path="/OwnerLogin" element={<OwnerLogin />} /> */}
            <Route
              path="CustomerLogin"
              element={<CustomerLogin setCustomer={setCustomer} />}
            />

            {/* <Route
              path="CustomerDashboard"
              // state={{ ServiceProvidersList: serviceProviderList }}
              element={
                <ProtectedRoute user={user}>
                  <CustomerDashboard ownersList={{ ownersList }} />
                </ProtectedRoute>
              }
            />
          </Route> */}
          </Route>

          <Route path="/customer" element={<SharedCustLayout />}>
            {/* <ProtectedRoute customer={customer}> */}
            <Route
              path="dash"
              element={
                <ProtectedRoute user={customer}>
                  <CustomerDashboard customer={customer} />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="list"
              element={
                <ProtectedRoute user={customer}>
                  <ServiceProvidersList
                    ownersList={{ ownersList }}
                    customer={customer}
                    filterOwners={filterOwners}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="list/:SPId"
              element={
                <ProtectedRoute user={customer}>
                  <SingleServiceP
                    customer={customer}
                    serviceProviders={ownersList}
                  />
                </ProtectedRoute>
              }
            />
            {/* </Route> */}
            {/* <Route path="/messaging" element={<Messages />}/> */}
          </Route>

          {/* </ProtectedRoute> */}
          {/* </Route> */}

          <Route path="/owner" element={<SharedOwnerLayout />}>
            <Route
              path="dash"
              element={
                <ProtectedRoute user={owner}>
                  <CustomerDashboard owner={owner} />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/edit" element ={<EditOwner/>}></Route>  */}
            {/* <Route path="/messaging" element={<Messages />}/> */}
          </Route>

          <Route path="*" element={<Error />} />
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
