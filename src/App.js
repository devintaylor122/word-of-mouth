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
// import { useNavigate } from "react-router-dom";
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
import OwnerDash from "./components/OwnerDash";
import LogOut from "./components/LogOut";
import { AuthProvider } from "./context/AuthProvider";

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
  onSnapshot,
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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [owner, setOwner] = useState({});
  const [customer, setCustomer] = useState({});
  const logout = async () => {
    await signOut(auth);
  };

  const [ownersList, setOwnersList] = useState([]);
  const [displayOwners, setDisplayOwners] = useState([]);
  const [favOwners, setFavOwners] = useState([]);

  const ownersCollectionRef = collection(db, "owners");
  const customersCollectionRef = collection(db, "customers");

  const createCustomer = async (
    newName,
    newPhone,
    newEmail,
    newHeardFrom,
    newCity,
    uid
  ) => {
    console.log("In createCustomer");
    await addDoc(customersCollectionRef, {
      name: newName,
      email: newEmail,
      phone: parseInt(newPhone),
      HeardFrom: newHeardFrom,
      city: newCity,
      uid: uid,
    });
  };
  const createOwner = async (
    newCompany,
    newOwner,
    newPhone,
    newIndustry,
    newSpecialty,
    newHours,
    newTag,
    mobile,
    uid,
    isFavorite
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
      tag: newTag,
      mobile: mobile,
      isFavorite: false,
      uid: uid,
    });
  };

  //--------------------------------FILTER--------------------------------
  // console.log("OWNERSLIST, ", ownersList);
  const filterOwners = async (filterType, filterWhere, filter, setState) => {
    console.log("in filterOwners. Filtered word= ", filter);
    // setDisplayOwners(ownersList);
    console.log("unfiltered Owners: ", ownersList);
    const filteredOwnersList = [];
    const q = await query(
      ownersCollectionRef,
      where(filterType, filterWhere, filter /*.toLowerCase()*/)
    );

    await onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        filteredOwnersList.push({ ...doc.data(), id: doc.id });
      });
      console.log("filtered Owners: ", filteredOwnersList);
      if (filteredOwnersList.length > 0) {
        setState(filteredOwnersList);
      } else {
        setState(ownersList);
      }
    });
    console.log("length", filteredOwnersList.length);
  };

  //-----------------------------------------------------------------------------

  // useEffect is called everytime page renders, don't async useEffect - bad practice
  // useEffect(() => {
  //   //async function (other option: .then, .catch)
  //   const getOwners = async () => {
  //     // console.log("XHELLOOOOO");
  //     const data = await getDocs(ownersCollectionRef);
  //     // const data = await getDocs(customersCollectionRef);

  //     setOwnersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     setDisplayOwners(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //doc.data access object that contains name and age
  //     // console.log("data HELLOOOOO", data);
  //   };
  //   getOwners();
  //   // setDisplayOwners(ownersList);
  //   console.log("Owners: ", ownersList);
  //   console.log("ALSO, ", displayOwners);
  // }, []);
  useEffect(() => {
    const getOwners = async () => {
      const data = await query(ownersCollectionRef);
      onSnapshot(data, (snapshot) => {
        setOwnersList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setDisplayOwners(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getOwners();
    console.log("OWNERSLIST: ", ownersList);
    console.log("ALSO, ", displayOwners);
  }, []);

  //--------------------------------FAVORITED--------------------------------
  const updateFav = async (ownerId, isFavorite) => {
    console.log("In update Fav. Fav Before: ", isFavorite);
    const userDoc = doc(db, "owners", ownerId);
    const newFields = { isFavorite: !isFavorite };
    console.log("isFav", isFavorite);
    await updateDoc(userDoc, newFields);
    console.log("finished update", isFavorite);
  };

  //-----------------------------------------------------------------------------

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
        <AuthProvider>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<SharedLoggedOutLayout />}>
              <Route index element={<Home />} />
              <Route
                path="OwnerForm"
                element={<OwnerForm createOwner={createOwner} />}
              />
              <Route
                path="CustomerForm"
                element={<CustomerForm createCustomer={createCustomer} />}
              />
              <Route path="CustomerForm" element={<CustomerForm />} />
              <Route
                path="OwnerCreateAccount"
                element={<OwnerCreateAccount />}
              />
              <Route
                path="CustomerCreateAccount"
                element={<CustomerCreateAccount />}
              />
              <Route
                path="OwnerLogin"
                element={<OwnerLogin setAUser={setOwner} />}
              />
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
              {/* <ProtectedRoute customer={customer}>  */}
              <Route
                path="dash"
                element={
                  <ProtectedRoute user={customer}>
                    <CustomerDashboard
                      filterOwners={filterOwners}
                      customer={customer}
                      favOwners={favOwners}
                      setFavOwners={setFavOwners}
                    />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="list"
                element={
                  <ProtectedRoute user={customer}>
                    <ServiceProvidersList
                      ownersList={{ ownersList }}
                      displayOwners={{ displayOwners }}
                      customer={customer}
                      filterOwners={filterOwners}
                      setDisplayOwners={setDisplayOwners}
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
                      ownersList={ownersList}
                      updateFav={updateFav}
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
                    <OwnerDash owner={owner} />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/edit" element ={<EditOwner/>}></Route>  */}
              {/* <Route path="/messaging" element={<Messages />}/> */}
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </AuthProvider>
      </Router>

      {/* <Route> */}
      {/* <button className="logout" element={<LogOut />}>
        {" "}
        LOG OUT
      </button> */}
      {/* </Route> */}
      {/* <button className="logout">
          <Link to="/">LOGOUT</Link>
        </button> */}
    </div>
  );
}
export default App;
