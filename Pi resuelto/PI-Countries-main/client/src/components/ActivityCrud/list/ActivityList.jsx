
import { useDispatch, useSelector } from "react-redux";
import  NavBar from  '../../NavBar/NavBar.jsx'
import "./ActivityList.css";
//import Activity from '../Card/Activity'
import { Link } from "react-router-dom";
import { getActivities } from "../../../redux/action.js";

import { useEffect } from "react";
export  function ActivityList() {
  const activities = useSelector((state) => state.activities);

  console.log(activities)
 const dispatch=useDispatch();

  useEffect(()=>
 {
   dispatch(getActivities());
},[dispatch])




  return (
    <div className="activityListContainer">

      <div>
        <NavBar />
      </div>

      <div className="container">
        
    <div className="mt-5 d-flex ">
    <Link to="/ActivityCreate">
   <button type="button" className="btn btn-primary btn-lg   float-lg-end">Crear Actividad</button>
   </Link>
    </div>

   

      <table className="table table-striped  table-hover">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Duration</th>
      <th scope="col">Season</th>
      <th scope="col">Dificulty</th>
      <th scope="col">Id Country</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  
 {/*  <th scope="row" ></th>  */}
    
      {
          activities?.map((a) => {
              return (
                <tr>
                <td>{a.name}</td>
                <td>{a.duration}</td>
                <td>{a.season}</td>
                <td>{a.difficulty}</td>
                <td>{`${a.countryId + " "}`}</td>
                <td>

          
                  
                 <Link to={`/ModifyActivity/${a.id}`}>
                 <button  className="btn btn-success">Edit</button>
             
                 </Link>
        
               

                  <Link to={`/DeleteActivity/${a.id}`}>
                 <button  className="btn btn-danger">Delete</button>
                 </Link> 
                 
                  
                </td>
              </tr>
              )
            })
            
            } 
  </tbody>
</table>
      </div>
      
    </div>
  );
}





/* 

 <td>1</td>
                        <td><a href="#"><img src="/examples/images/avatar/1.jpg" class="avatar" alt="Avatar" /> Michael Holz</a></td>
                        <td>04/10/2013</td>                        
                        <td>Admin</td>
                        <td><span class="status text-success">&bull;</span> Active</td>
                        <td>
                            <a href="#" class="settings" title="Settings" data-toggle="tooltip"><i class="material-icons">&#xE8B8;</i>Upd</a>
                            <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i>Del </a>
                        </td>
*/