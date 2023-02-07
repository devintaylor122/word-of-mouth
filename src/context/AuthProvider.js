import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseconfig";
import { db } from "../firebaseconfig.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [anyUser, setAnyUser] = useState();
  const [userFSInfo, setUserFSInfo] = useState();

  const customersCollectionRef = collection(db, "customers");
  const ownersCollectionRef = collection(db, "owners");

  //   useEffect(() => {
  //     const getOwners = async () => {
  //       const data = await query(ownersCollectionRef);
  //       onSnapshot(data, (snapshot) => {
  //         setOwnersList(
  //           snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //         );
  //         setDisplayOwners(
  //           snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //         );
  //       });
  //     };
  //     getOwners();
  //     console.log("OWNERSLIST: ", ownersList);
  //     console.log("ALSO, ", displayOwners);
  //   }, []);

  //   useEffect(() => {
  //     if (anyUser.length > 0) {
  //       const filterUsers = async () => {
  //         // const filteredOwnersList = [];

  //         const q = await query(
  //           customersCollectionRef,
  //           where("uid", "==", anyUser.uid /*.toLowerCase()*/)
  //         );
  //         console.log("Do you see me4 3");
  //         await setUserFSInfo(q);

  //         console.log("q", q);
  //       };
  //       filterUsers();
  //     }
  //   }, []);
  // await onSnapshot(q, (snapshot) => {
  //   snapshot.docs.forEach((doc) => {
  //     filteredOwnersList.push({ ...doc.data(), id: doc.id });
  //   });
  //   console.log("filtered Owners: ", filteredOwnersList);
  //   if (filteredOwnersList.length > 0) {
  //     setState(filteredOwnersList);
  //   } else {
  //     setState(ownersList);
  //   }
  // });
  // console.log("length", filteredOwnersList.length);

  //   const createUser = (email, password) => {
  //     return createUserWithEmailAndPassword(auth, email, password);
  //   };
  //   const signIn = (email, password) => {
  //     return signInWithEmailAndPassword(auth, email, password);
  //   };

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
