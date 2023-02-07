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

  // const q = await query(collection(db, "owners"), where("uid", "==", ownerId));
  // const querySnapshot = getDocs(q);
  // querySnapshot.forEach((owner) => {
  //   console.log(owner.id, " => ", owner.data());
  // });
  // console.log(q);
  // await onSnapshot(q, (snapshot) => {
  //   snapshot.docs.forEach((doc) => {
  //     filteredOwnersList.push({ ...doc.data(), id: doc.id });
  //   });
  useEffect(() => {
    // if (anyUser.length > 0) {
    console.log("Do you see me4 3");
    const filterUsers = async () => {
      let currentUserFSID = "";
      const q = await query(
        customersCollectionRef,
        where("uid", "==", anyUser.uid /*.toLowerCase()*/)
      );

      // await onSnapshot(q, (snapshot) => {
      //   snapshot.docs.forEach((doc) => {
      //     currentUser.push({ ...doc.data() });
      //   });
      // });
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((user) => {
        console.log(user.id, "and", user);
        currentUserFSID = user.id;
      });
      console.log("query snap", querySnapshot);
      // await setUserFSInfo(currentUser);

      console.log("currentUser", currentUserFSID);
      const docSnap = await getDoc(db, "customers", currentUserFSID);
      console.log("doc data", docSnap.data());
    };

    if (anyUser) {
      filterUsers();
    }
    // }
  }, []);

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
