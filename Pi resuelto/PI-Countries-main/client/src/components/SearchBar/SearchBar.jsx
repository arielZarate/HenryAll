import { useState} from 'react'
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../redux/action';
//import './SearchBar.css'

export function SearchBar() {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    
    function enviar(e){
    
        if (search.length === 0) return alert('Debe colocar un Pais');
        dispatch(getCountryByName(search))  //le paso search que es el estado
        setSearch('') //despues que lo busca resetea la barra de busqueda
    }

    function handlerInputChange(e){
      
      // console.log(e.target.value)
        setSearch(e.target.value)
   
    }

    return (<div className='formSearchBar mr-5'>
       
          <input  className='' type="text" placeholder='buscar pais'  value={search}  onChange={(e)=>handlerInputChange(e)}   />
           {/*  <input  className='inputButton' type="submit" value="Buscar" /> */}
            <button type='submit' onClick={(e)=>enviar(e)}>Buscar</button> 
       
         </div>
    )
}
