import React from 'react';
import {useState}from 'react';





//ESTUDIAR MAS ESTA PARTE SOBRE ERRORES


const exp_pass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const exp_usu = /\S+@\S+\.\S+/;
 export function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = "Username is required";
  } else if (!exp_usu.test(input.username)) {
    errors.username = "Username is invalid";
  }
  if (!input.password) {
    errors.password = "Password is required";
  } else if (!exp_pass.test(input.password)) {
    errors.password = "Password is invalid";
  }

  return errors;
}


export default function  Form() {



/*  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  */

   const [input, setInput] = useState({
    username: '',
    password: '',
  });
   const [error, setError] = useState({});



  
   const handleChange=(e)=>{
     setInput({
        ...input, 
        [e.target.name]:e.target.value
       })
      

       //el handler error debe estar dentro del input 
      setError(validate(
        {
          ...input,
          [e.target.name]:e.target.value
        }
      ))
      
      }
     


    const handlerSubmit=(e)=>{
   e.preventDefault();
    }


  //==============================
  return (
  <div>
     <form  onClick={handlerSubmit}>
      <label for="username">
       Username:
      </label>
      <input 
       className={error.username && 'danger'}

        type="text" 
        id="username"
        name="username"

        // aca el input toma el valor del state pero cuando este cambia no lo hace 
        value={input.username}
        //ahora si bindeo y el state recibe valores desde el input
       // onChange={(e) => setInput(e.target.value)}
        onChange={handleChange}
       
      />
      {/* error */}
      {error.username && (<p className='danger'>{error.username}</p>) }
      <br />

      {/* secund inputs */}
      <label for="password">
       Password:
      </label>
      <input 
         className={error.password && 'danger'}
        type="password" 
        id="password"
        name="password"
       value={input.password} //del estado al input
        onChange={handleChange}   //del input al estado
      /> 
          {/* error */}
          {error.password && (<p className='danger'>{error.password}</p>) }
      <br />

      <button type="submit"
       disabled={error.username || error.password}
      >Submit</button>


     </form>
  </div>
  )
}
