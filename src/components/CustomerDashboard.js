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
  const { serviceProviderList } = props.props;

  return (
    <div>
      <ServiceProvidersList industriesList={serviceProviderList} />
    </div>
  );
};

export default CustomerDashboard;
