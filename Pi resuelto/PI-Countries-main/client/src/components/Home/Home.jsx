import React from "react";
import NavBar from '../NavBar/NavBar'
import {Cards} from '../Countries/Cards/Cards.jsx'
import './Home.css'

export  function Home() {
  return (
    <div className = 'ContainerPadre'>
      <div className = ''>
      <NavBar/>
     </div> 
     <div className = 'cards'>
      <Cards/>
     </div>
    </div>
  );
}


