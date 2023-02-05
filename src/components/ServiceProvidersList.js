//PERHAPS THINK ABOUT COMBINING SERVICE PROVIDER INTO THIS ONE?
//If I go straight to this page and not mainpage->here, then the SPs don't load/will be null
//Remove underline from links
import React, { useEffect, useState } from "react";
import ServiceProvider from "./ServiceProvider";
import { useLocation, Link } from "react-router-dom";

function ServiceProvidersList(props) {
  const setDisplayOwners = props.setDisplayOwners;
  let { ownersList } = props.ownersList;
  let { displayOwners } = props.displayOwners;
  const [filter, setFilter] = useState("");
  // const [displayOwners, setDisplayOwners] = useState(ownersList);
  const filterOwners = props.filterOwners;

  const listElements = displayOwners.map((ind) => (
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
          filterOwners("industry", filter, setDisplayOwners);
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
