/* eslint-disable array-callback-return */
import React, {  useState ,useEffect} from 'react'

import {useDispatch,useSelector}from 'react-redux'

import {Link} from 'react-router-dom'
import './Cards.css'
import Paginado from '../../Paginado/Paginado.jsx'

import {Card} from '../Card/Card.jsx'
// eslint-disable-next-line no-unused-vars
import  {getCountries,
       getActivities,
         filterCountriesByContinente,
         filterCountryByPopulation,
        filterCountryByOrdenAZ,
        filterByActivity
        }  from '../../../redux/action'

export function Cards() {
  const dispatch=useDispatch();
  const allCountries=useSelector((state)=>state.countries)  //viene del reducer
  const allActivities=useSelector((state)=>state.activities)

  //======ESTADOS LOCALES========
/* 
[ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina,
 mostrando los primeros 9 en la primer pagina.
*/
const[currentPage,setCurrentPage]=useState(1); //pagina inicial arranca desde la 1
const[countriesByPage]=useState(10); //cuantos paises por pagina
const indexLastCountry=currentPage*countriesByPage;
const indexFisrtCountry=indexLastCountry-countriesByPage;
const currentCountries=allCountries.slice(indexFisrtCountry,indexLastCountry)
const [orden,setOrden]=useState("");



const paginado=(pageNumber)=>{
  setCurrentPage(pageNumber)
}



//ciclo de vida del componnete se monta y desmonta
  useEffect(()=>
 { dispatch(getCountries());
   dispatch(getActivities());
},[dispatch])


  const handlerClick=(e)=>{
  //solo despacho los caracteres
   dispatch(getCountries())
 
  }  
 

const handlerContinent=(e)=>{

//console.log(e.target.value)
 dispatch(filterCountriesByContinente(e.target.value))
}



const handlerPopulation=(e)=>{
 console.log(e.target.value)
dispatch(filterCountryByPopulation(e.target.value))
setCurrentPage(1); //seteo la pagina en 1 nuevamente
setOrden(e.target.value);//setea la pagina local y me lo renderiza
}

const handlerOrdenAZ=(e)=>{

  //console.log(e.target.value);
 dispatch(filterCountryByOrdenAZ(e.target.value))
  setCurrentPage(1);
  setOrden(e.target.value)
} 


const  handlerFilterActivity=(e)=> {
 console.log(e.target.value);
  dispatch(filterByActivity(e.target.value));
  setCurrentPage(1);//que empieze desde la pagina 1
  setOrden('');//setea la pagina local y me lo renderiza
} 
/* const handlerCreatedInDB=(e)=>{
dispatch(filterCreated(e))
} */
 //return 
  return(
  
  
     <div className=''>
          <br></br>
          <br></br>
   

        <button  className='' onClick={(e)=>handlerClick(e)}>
         Volver a cargar  los countries
       </button>
       <br />
   
    <div>
     
       <br />
 
        <label htmlFor="orden1">Orden descendente/Ascendente</label>
           <select  id='orden1'onChange={(e)=>handlerOrdenAZ(e)} >
           <option value="a-z">A-Z</option>
           <option value="z-a">Z-A</option>
          </select> 

         <br />

         <label htmlFor="orden2">Por poblacion</label>
         <select name="" id="orden2"  onChange={(e)=>handlerPopulation(e)}>
           <option value="mayor">↑ Poblacion</option>
           <option value="menor">↓ Poblacion</option>    
         </select>
      
          <br />



      
    

         <div>
          <label>Actividades</label>
          <select className='filterAndOrder' onChange={(e) => handlerFilterActivity(e)}>
          <option value="todos"> Todos </option>
          {allActivities.map((v) => (
            <option value={v.name}>{v.name}</option>
          ))}
        </select>
 
        </div> 



        
         <div className=' '>
           <label htmlFor="orden3">Por continente</label>
           <select  id='orden3'   onChange={(e)=>handlerContinent(e)}>
             <option value="All">Todos</option>
             <option value="North America">Norte America</option>
             <option value="South America">Sur America</option>
             <option value="Europe">Europe</option>
             <option value="Asia">Asia</option>
             <option value="Africa">Africa</option>
             <option value="Oceania">Oceania</option>
             <option value="Antarctica">Antartida</option>
           </select>
         </div>
 
    


    <Paginado 
     countriesPerPage={countriesByPage}
     countries={allCountries}
     paginado={paginado}
    
    ></Paginado>

   
  
   <div >
   
        {currentCountries?.map((country) => {
          return (
            <div key={country.id}>

              {/* este link permite irse al detail */}
              <Link to={`/home/${country.id} `} >
                <Card
                  nombre={country.name}
                  bandera={country.flags}
                  continente={country.continents}
                  capital={country.capital}
                  poblacion={country.population}  
                />
              </Link>
            </div>
          );
        })}
      </div>
 

  </div> 
  </div>
 
  )
}






