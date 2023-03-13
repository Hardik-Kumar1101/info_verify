import React from 'react';
import './Home.css'
import Bars from './Bars'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';

const Home = () => {

    const {state} = useLocation();
    const [clients, setClients] = useState([]);


    const List = state.data
    console.log("this is state.data value from Home.js ",List)
    Object.keys(List).forEach((k, i) => {
        if (i >= 0 && i < 3000) {
        clients.push(List[k])
        }}
    )
    console.log("this is from Home.js",clients)

    return (
        <>
            <h1>List of Submitter</h1>
            <div className='listbox'>
                
            {clients.map((client) => (
                    console.log(client),
                    <Bars name={client.name} email={client.email} dob={client.dob} phone={client.phno}/>
            
            ))} 

            </div> 
        </>
    )
}

export default Home