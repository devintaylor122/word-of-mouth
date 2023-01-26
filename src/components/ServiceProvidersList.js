import React from "react";
import ServiceProvider from "./ServiceProvider";

function ServiceProvidersList(props) {
  const serList = props.industriesList;

  const listElements = serList.map((ind) => (
    <ServiceProvider
      serviceProviderList={props.industriesList}
      data={ind}
      toggleDisplay={props.toggleDisplay}
    ></ServiceProvider>
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
