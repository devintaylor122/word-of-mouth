import React from 'react';
import ReactDOM from 'react-dom';

function ServiceProviders(props){
    return <div>
        <p>
            <h1>Industry name: <b> {props.data.Industry}</b></h1>
        </p>
        <p>
            <h1>location: <b> {props.data.Location}</b></h1>
        </p>
    </div>
}
function ServiceProvidersList(props){
    const serList = props.industriesList;

    const listElements = serList.map((ind)=> 
        <ServiceProviders data = {ind}></ServiceProviders>
    );
    return (
        <div>
            {listElements}
        </div>
    );
}
const industries = [
    {Industry: 'Food', Location:"Seattle"},
    {Industry: 'Beauty', Location:"Seattle"},
    {Industry: 'Therapy', Location:"Seattle"},
    {Industry: 'Housework', Location:"Seattle"},
    {Industry: 'Lawncare', Location:"Seattle"},
    {Industry: 'Petcare', Location:"Seattle"},
    {Industry: 'Childcare', Location:"Seattle"},
    {Industry: 'Cleaning Services', Location:"Seattle"},
    {Industry: 'Seamstress', Location:"Seattle"},
    {Industry: 'Entertainment', Location:"Seattle"}
];

const element=<ServiceProvidersList industriesList = {industries}></ServiceProvidersList>
ReactDOM.render(element,document.getElementById("root"));