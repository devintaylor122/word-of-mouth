import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseconfig";
import { db } from "../firebaseconfig.js";
import { getDocs, onSnapshot, getDoc } from "firebase/firestore";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [anyUser, setAnyUser] = useState();
  // const [userDBInfo, setUserDBInfo] = useState();
  // const [ownersList, setOwnersList] = useState([]);
  // const [customersList, setCustomersList] = useState([]);
  // const customersCollectionRef = collection(db, "customers");
  // const ownersCollectionRef = collection(db, "owners");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("AUTHProvider", currentUser);
      setAnyUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //   console.log("anyUser", anyUser.uid);
  return (
    <AuthContext.Provider value={{ anyUser /*, createUser, signIn */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
