import React ,{useEffect,useState}from 'react'
import { Link,useHistory} from 'react-router-dom'
import {postActivities,getCountries} from '../../../redux/action'
import { useDispatch,useSelector } from 'react-redux'

import './ActivityCreate.css'



export function ActivityCreate() {
 const dispatch=useDispatch();
 const history=useHistory();

 //al creaar una actividad debo elegir en este caso de que pais debe ser
 const countries=useSelector((state)=>state.countries);

 const [input,setInput]=useState({

  name: "",
  difficulty: "",
  duration: "",
  season: "",
  countryId: [],

 })


 //validador de from 
 const [errors,setErrors]=useState({});


 function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Debe completar este campo";
  } else if (!input.duration) {
    errors.duration = "Debe completar este campo";
  } else if (!input.difficulty) {
    errors.difficulty = "Debe seleccionar la complejidad";
  } else if (!input.season) {
    errors.season = "Debe seleccionar una estacion";
  } else if (input.countryId.length ==0) {
    errors.countryId = "Debe seleccionar un pais para crear una actividad";

  }
  return errors;
}

 useEffect(()=>{
  dispatch(getCountries())
 },[dispatch])


 const handlerChange=(e)=>{
  //console.log(e.target.value)
  setInput({
    ...input,
    //el target name es el nombre del imput                                                                                                                                                        
    [e.target.name]:e.target.value
  })

  //inciia el Error

  setErrors(validate({
    ...input,
    [e.target.name]:e.target.value
   }));

}





 function handlerDelete(e) {
  setInput({
    ...input,
    //mostrame los id que sena disntintos a los seleccionados
    countryId: input.countryId.filter((el) => el !== e),
  });
}

function handlerSelect(e) {
  console.log(e.target.value)
  setInput(
    { ...input, 
    countryId:  [...input.countryId, e.target.value]
  });
}

function handlerSubmit(e) {
  e.preventDefault(e);

  //validaciones chotas con alert
/*    if (
  input.name === "" ||
  input.duration === "" ||
  input.difficulty === "" ||
  input.season === "" ||
  input.countryId.length === 0) return alert('Debe llenar los campos');  */

  //dispatch el submit

  dispatch(postActivities(input));

  alert("Actividad Creada");  //aviso 

  
 

  //========================
  setInput({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryId: [],
  }) 

  //el history te redirije al home
history.push("/Home");
}


 return (
    <div className='ContainerCreate'>
      
          <Link to="/Home" > 
           <button className='boton'>Volver a  Home</button>
          </Link> 


        
       <form  onSubmit={(e)=>handlerSubmit(e)} >



            <span > Crea una Actividad </span>

            
            <div >
              <label className=''></label>
              <input
                className=''
                type="text"
                placeholder="Coloque la Actividad..."
                value={input.name}
                name="name"
                onChange={handlerChange} 
              />
               {errors.name && <p className="Error">{errors.name}</p>} 
            </div>


            <div className=''>
              <label> Dificultad </label>
              <input
                className=''
                type="range"
                name="difficulty"
                min="1"
                max="5"
                 value={input.difficulty} 
               onChange={(e) => handlerChange(e)} 
              />
               {errors.difficulty && <p className="Error"> {errors.difficulty}</p>} 
            </div>




            <div className=''>
              <label></label>
              <input
                className=''
                type="text"
                value={input.duration}
                name="duration" 
                placeholder="Coloque la Duracion..."
                onChange={handlerChange} 
             />
               {errors.duration && <p className="Error">{errors.duration}</p>} 
            </div>
           



            <div className=''>
              <label htmlFor="name">Temporada:</label>
              <select
              id='name'
                className=''
                name="season"
                value={input.season}
                 onChange={(e) => handlerChange(e)} 
              >
                
                <option className=''> Temporada </option>
                <option className='' value="INVIERNO">Invierno</option>
                <option className=' 'value="VERANO">Verano</option>
                <option className='' value="OTOÑO">Otoño</option>
                <option className='' value="PRIMAVERA">Primavera</option>
              </select>
       
            </div>
            {errors.season && <p className="Error">{errors.season}</p>} 

           
            {errors.countryId && <p className="Error">{errors.countryId}</p>}

          <div>
          <select  className="" onChange={(e) => handlerSelect(e)}>
           <option className='' > Paises </option>
            {countries.map((v) => (
            <option className='' value={v.id}>{v.name}</option>
             ))}
         </select>
      </div>





            <div> {/* esto muestro abao del select cada vez que selecciono */}
            <ul>
              <li>
                {input.countryId.map((country) => (
                <div >
                  <input className='' type='button' value='X'   onClick={() => handlerDelete(country)} />
                   <h4>{country}</h4>
                </div>
              ))}
              </li>
            </ul>
            </div> *


              <button  type="submit">Crear Actividad</button>
         
          </form>
    
    </div>
  )
}

