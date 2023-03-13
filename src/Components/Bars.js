import React from 'react';


const Bars = (props)=>{
const name = props.name
const dob = props.dob
const email = props.email
const phone = props.phone

console.log("this is from bars",name)
    return <>
        <div className="bar">
            <ul>
                <li> {name} </li>
                <li> {dob} </li>
                <li> {email} </li>
                <li> {phone} </li>
            </ul>
        </div>
    </>
}

export default Bars;