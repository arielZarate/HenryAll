/* 
Creamos nuestras Actions
En nuestro archivo index.js en nuestra carpeta actions. 
Por ahora vamos a crear 4 actions. Una para hacer la request a la API y 
traer todas las peliculas getMovies,
otra para traer los detalles de la pelicula especifica getMovieDetail,
 a otra para agregarlas como Favoritas addMovieFavorite 
 y otra para eliminarla de favoritas removeMovieFavorite.

Abajo tienes un par de ejemplos, para las dos que faltan tienes que investigar
 y hacerlo por tu propia cuenta. La api que usamos es http://www.omdbapi.com/

Para obtener alguna película a partir de su ID pueden usar el  */
//endpoint: http://www.omdbapi.com/?apikey=20dac387&i={idMovie}

//===========ACTIONS=============

//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=4c848c2c
//http://www.omdbapi.com/?i=tt3896198&apikey=4c848c2c

//==============================

import axios from "axios";
import {
  GET_MOVIES,
  ADD_MOVIE_FAVORITE,
  GET_MOVIES_DETAIL,
  REMOVE_MOVIE_FAVORITE,
} from "../actions-types.js";

let KEY = "4c848c2c";

export function getMovies(titulo) {
  return async function (dispatch) {
    const all = await axios.get(
      `http://www.omdbapi.com/?apikey=${KEY}&s=${titulo}`
    );
    console.log(JSON.stringify(all));
    return dispatch({
      type: GET_MOVIES,
      payload: all.data,
    });
  };
}

//NOTA EL data viene del axios
export function getMovieDetail(idMovie) {
  return async function (dispatch) {
    const movie = await axios.get(
      ` http://www.omdbapi.com/?apikey=${KEY}&i=${idMovie}`
    );
    // console.log(movie.data);
    return dispatch({
      type: GET_MOVIES_DETAIL,
      payload: movie.data,
    });
  };
}

//FAVORITOS
export function addMovieFavorite(movie) {
  return { type: ADD_MOVIE_FAVORITE, payload: movie };
}
export function removeMovieFavorite(id) {
  return {
    type: REMOVE_MOVIE_FAVORITE,
    payload: id,
  };
}

/* 
Cada accion devuelve un objecto, la primera key de este objeto es el type, su valor lo
 ponemos nosotros, por convencion se usan mayusculas y guion bajo _ para separar.
  Como segundo argumento recibe un payload, que son datos que puede llevar que usaremos
   en nuestro reducer para actualizar el estado. En addMovieFavorite el payload que 
   pasaremos cuando hagamos un dispatch de esa action sera el nombre de la Pelicula.
   En removeMovieFavorite,nuestro payload sera la pelicula a eliminar. En getMovies, 
   nuestro payload sera el objeto que recibamos de nuestra request. En getMovieDetail, 
   el payload sera el objeto con los detalles de la pelicula que seleccionamos.

   .

*/
