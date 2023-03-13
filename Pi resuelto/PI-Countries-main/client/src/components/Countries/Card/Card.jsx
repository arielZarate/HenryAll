import React, { Fragment } from 'react'



// la tarjeta recibe cada elemento iterado del array de countries
//la card renderiza lo que le paso por prps
export  function Card({nombre,bandera,continente,capital,poblacion}) {
  return (
    <Fragment>
     
     <div className='cardContainer'>
      <h3>{nombre}</h3>
      <img className= 'cardImg'src={bandera} alt='Imagen no encontrada'/>
      <div className='infoConteiner'>
      <h5 className='content'>Capital: {capital}</h5>
      <h5 className='content'>Continente: {continente}</h5>
      <h5 className='content'>Poblacion: {poblacion}</h5>
      </div>
  </div>

    </Fragment>

  )
}

 
