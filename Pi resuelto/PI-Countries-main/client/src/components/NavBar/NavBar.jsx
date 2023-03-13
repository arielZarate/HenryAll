import React from "react";
import { Link } from "react-router-dom";
import {SearchBar} from "../SearchBar/SearchBar";
import './NavBar.css'

export default function NavBar() {
 
  return (
    <div  className='navBarConteiner' >
      <div className='navContent' > 
        <div className='countries'>Countries</div>
        <div className='byEsteban'>By Ariel Zarate</div>
      </div>
      <div /*  className='navContent' */ >
      <Link className='navLink' to='/Home'>Home</Link> 
      <br></br>
       <Link className='navLink' to='/ActivityCreate'>Crear Actividad</Link> 
       <br></br>

      <Link className='navLink'  to='/ActivityList'>Lista de Actividades</Link> 
      <br></br>
      <Link className='navLink'  to='/DetailCountry'></Link> 
     
      <SearchBar className='navSearchBar'/>
    </div>
      </div>
  );
} 