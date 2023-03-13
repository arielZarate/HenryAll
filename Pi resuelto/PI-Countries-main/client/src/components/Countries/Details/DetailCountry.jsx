import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getDetail,restartDetail} from '../../../redux/action'
import NavBar from "../../NavBar/NavBar.jsx";
import './Detail.css'



export default function DetailCountry (){
    const dispatch = useDispatch()
    //suamos el useParams
      const {id}=useParams();
    useEffect(() => {
     //(props.match.params.id
    // console.log(id)
      dispatch(restartDetail())
      dispatch(getDetail(id)) 
    },[dispatch,id])

    const detail = useSelector((state)=> state.detail)
   // console.log("======Datos======\n",detail)
  return (

    <div className=''>
      <div>
      <NavBar/>
      </div>

      <div className='detailE'>
        {detail?
          
              <div className='detailContent'>
                   <h1 className='objDetail'>{detail.name}</h1>
                <img className='objDetail' src={detail.flags} alt='Imagen no encontrada' width='250px' height='175px'/> 
             
                  <div className='obj2Detail'>
                  <h2>Id: {detail.id}</h2>
                  <h2>Capital: {detail.capital}</h2>
                  <h2>Continente: {detail.continents}</h2>
                  <h2>Subregion: {detail.subregion}</h2>
                  <h2>Area: {detail.area} km2</h2>
                  <h2>Poblacion: {detail.population}</h2>
                  </div> 
              {  <div className='activitiesDetail'>  {detail.Activities?.map(el=>{
                    return(
                      <div>
                        <Link className='linkDetail' to='/Activity'>
                        <h2>Actividad</h2>  
                        
                        </Link>
                        <div className='obj3Detail'>
                        <h3>{el.name}</h3>
                        <h3>Dificultad: {el.difficulty}</h3>
                        <h3>Duracion: {el.duration}</h3>
                        <h3>Temporada: {el.season}</h3>
                      </div>
                      </div>
                  )})}</div> 
                    } 
  
              </div> 
              
               : <div className='loading'>
                <p> Loading wait... </p>
                </div>  

                    }
              
             </div>    
    </div>

    
  );
};
