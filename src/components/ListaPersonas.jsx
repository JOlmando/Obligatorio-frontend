import { useEffect, useState } from "react";
//import axios from "axios";
import api from "../api/api";
import Persona from "./Persona";

const ListaPersonas = () => {

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        /*fetch("https://randomuser.me/api/?results=10")
            .then((res) => res.json())
            .then((data) => {
                setPersonas(data.results);
                console.log(data.results);
            });*/
    // axios.get("https://randomuser.me/api/?results=10")
    //     .then((res) => {
    //         setPersonas(res.data.results);
    //         console.log(res.data.results);
    //     })
    api.get("?results=10")
        .then((res) => {
            setPersonas(res.data.results);
            console.log(res.data.results);
        })
           
    }, []);
  return (
    <div>
        <h1>ListaPersonas</h1>
        
            {personas.map((persona) => (
                <Persona key={persona.login.uuid} persona={persona} />
            ))}
        
    </div>
  )
}

export default ListaPersonas