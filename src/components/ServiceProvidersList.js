//PERHAPS THINK ABOUT COMBINING SERVICE PROVIDER INTO THIS ONE?
//If I go straight to this page and not mainpage->here, then the SPs don't load/will be null
//Remove underline from links
import React from "react";
import ServiceProvider from "./ServiceProvider";
import { useLocation, Link } from "react-router-dom";

function ServiceProvidersList(props) {
  const serList = props.industriesList;
  // console.log("IN SPL", serList);
  // const info = useLocation();
  // const serList = info.state?.data;

  const listElements = serList.map((ind) => (
    <article key={ind.id}>
      <Link to={`/CustomerDashboard/${ind.id}`}>
        <ServiceProvider
          serviceProviderList={props.industriesList}
          data={ind}
          toggleDisplay={props.toggleDisplay}
        ></ServiceProvider>
      </Link>
    </article>
  ));
  return <div>{listElements}</div>;
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
