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
  const { ownersList } = props.ownersList;

  return (
    <div>
      <ServiceProvidersList ownersList={ownersList} />
    </div>
  );
};

export default CustomerDashboard;
