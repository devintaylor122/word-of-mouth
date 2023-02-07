import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseconfig";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [anyUser, setAnyUser] = useState();

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
  console.log("anyUser", anyUser);
  return (
    <AuthContext.Provider value={{ anyUser /*, createUser, signIn */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
