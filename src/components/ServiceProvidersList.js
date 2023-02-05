//PERHAPS THINK ABOUT COMBINING SERVICE PROVIDER INTO THIS ONE?
//If I go straight to this page and not mainpage->here, then the SPs don't load/will be null
//Remove underline from links
import React, { useEffect, useState } from "react";
import ServiceProvider from "./ServiceProvider";
import { useLocation, Link } from "react-router-dom";

function ServiceProvidersList(props) {
  let { ownersList } = props.ownersList;
  const [filter, setFilter] = useState("");
  // const [displayOwners, setDisplayOwners] = useState(ownersList);
  const filterOwners = props.filterOwners;

  // useEffect(() => {
  //   console.log("Page is rendered");
  //   const setInitial = async () => {
  //     setDisplayOwners(ownersList);
  //   };
  //   setInitial();
  //   console.log("Initial is set");
  // }, []);

  // const filterOwners = async (inputIndustry, ownersList) => {
  //   const customerIndQuery = query(
  //     collection(db, "owners"),
  //     where("industry", "==", inputIndustry) //lower-caseify inputIndustry
  //     //could set a limit if app grows (ex: limit(10))
  //   );
  //   ownersList = [];
  //   const querySnapshot = await getDocs(customerIndQuery);
  //   querySnapshot.forEach((snap) => {
  //     ownersList.push(snap.data());
  //     console.log("In filterOwners. Data= ", snap.data);
  //   });
  // };
  // const filterOwnersList = (filter, ownersList) => {
  //   filterOwners(filter, ownersList)
  // }

  // const filterOwners = (filter, ownersList) => {
  //   console.log("Inside filterOwners, Filter= ", filter);

  //   const filteredOwnersList = [];
  //   for (const owner of ownersList) {
  //     if (owner.industry.includes(filter)) {
  //       filteredOwnersList.push(owner);
  //     }
  //   }
  //   if (filteredOwnersList.length > 0) {
  //     setDisplayOwners(filteredOwnersList);
  //     console.log("not empty filter");
  //   } else {
  //     console.log("empty filter");
  //     setDisplayOwners(ownersList);
  //   }
  //   console.log(
  //     "filteredOwnersList",
  //     filteredOwnersList,
  //     "OWNERS",
  //     ownersList,
  //     "state",
  //     displayOwners
  //   );
  // };
  // console.log("OUTSIDE owners", ownersList);

  const listElements = ownersList.map((ind) => (
    <article key={ind.id}>
      <Link to={`/customer/list/${ind.id}`}>
        <ServiceProvider
          serviceProviderList={props.industriesList}
          data={ind}
          toggleDisplay={props.toggleDisplay}
        ></ServiceProvider>
      </Link>
    </article>
  ));
  return (
    <div>
      {/* <form> */}
      <input
        type="text"
        id="filter"
        name="filter"
        placeholder="Enter industry to filter"
        // value={}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />
      <button
        onClick={() => {
          // }} //   console.log("button clicked"); // {() => {
          filterOwners(filter, ownersList);
        }}
      >
        Filter
      </button>
      {/* </form> */}
      <div>{listElements}</div>
    </div>
  );
}
const industries = [
  { Industry: "Food", Location: "Seattle" },
  { Industry: "Beauty", Location: "Seattle" },
  { Industry: "Therapy", Location: "Seattle" },
  { Industry: "Housework", Location: "Seattle" },
  { Industry: "Lawncare", Location: "Seattle" },
  { Industry: "Petcare", Location: "Seattle" },
  { Industry: "Childcare", Location: "Seattle" },
  { Industry: "Cleaning Services", Location: "Seattle" },
  { Industry: "Seamstress", Location: "Seattle" },
  { Industry: "Entertainment", Location: "Seattle" },
];

const element = (
  <ServiceProvidersList industriesList={industries}></ServiceProvidersList>
);

export default ServiceProvidersList;
