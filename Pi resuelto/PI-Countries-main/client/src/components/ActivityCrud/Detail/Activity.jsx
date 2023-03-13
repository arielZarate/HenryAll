import React from 'react'
import '../list/ActivityList.css'

export  function Activity({ name, duration, season, difficulty, countryId }) {
  return (
    <div className=''>
     {/*  <h2 className='h2Activity'>{name}</h2>
      <h3 className='h3Activity'>Duracion: {duration}</h3>
      <h3 className='h3Activity'>Temporada: {season}</h3>
      <h3 className='h3Activity'>Dificultad: {difficulty}</h3>
      <h3>{countryId}</h3> */}






      <table class="table table-striped">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Duration</th>
      <th scope="col">Season</th>
      <th scope="col">Dificulty</th>
      <th scope="col">Id Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
   
      <td>{name}</td>
      <td>{duration}</td>
      <td>{season}</td>
      <td>{difficulty}</td>
      <td>{countryId}</td>
    </tr>
   
  </tbody>
</table>

    </div>


  );
}
