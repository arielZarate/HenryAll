 

import React from "react";
import './Paginado.css'
//import styles from './paginado.module.css'
export default function Paginado({countriesPerPage, countries, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(countries.length/countriesPerPage); i++) {
        pageNumbers.push(i)   
    }
    return(
        /* className='paginadoContainer' */
        <nav className='paginadoContainer'>
            <ul className ='ul'>
                {pageNumbers && 
                pageNumbers.map(number =>(
                    <li key={number}>
                        {/* className ='numeroPaginado' */}
                        <a className ='numeroPaginado' href onClick={()=>paginado(number)}> {number} </a>  
                    </li> 
                ))}
            </ul>
        </nav>
    )
}


/* 


import React from 'react'

import styles from './paginado.module.css'
                        //props 
export  function Paginado(countriesPerPage,countries,paginado) {
const pageNumbers=[];


//match.ceil redondea para arriba
for (let i = 1; i <= Math.ceil(countries.length/countriesPerPage); i++) {
    pageNumbers.push(i)
}


  return (
     
      <nav>
        <ul className={styles.paginado}>
            {
                pageNumbers?pageNumbers.map(number=> {
                return   (
                    <li>
                        <a ><h1>{number}</h1></a>

                    </li>
                   )
                }):<h1>No se encuemtran elementos</h1> 
            }
        </ul>

      </nav>
    
   
    )


}


*/