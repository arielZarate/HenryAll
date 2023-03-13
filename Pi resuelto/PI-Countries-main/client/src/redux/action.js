import axios from "axios";
import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  FILTER_BY_CONTINENT,
  FILTER_BY_POPULATION,
  FILTER_BY_ORDEN_AZ,
  SEARCH_COUNTRY_BY_NAME,
  POST_ACTIVITIES,
  FILTER_BY_ACTIVITIES,
  URL_COUNTRIES,
  URL_ACTIVITIES,
  GET_DETAIL,
  RESET,
} from "./types_actions";

export function getCountries() {
  return async function (dispatch) {
    try {
      //aca sew conecta el front con el back
      const info = await axios.get(`${URL_COUNTRIES}`);
      return dispatch({
        type: GET_COUNTRIES,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const info = await axios.get(`${URL_COUNTRIES}/${id}`);
      // console.log(info.data);
      return dispatch({
        type: GET_DETAIL,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function restartDetail() {
  return (dispatch) => {
    dispatch({ type: RESET });
  };
}
//////////barra de busqueda////////////////

export function getCountryByName(name) {
  return async function (dispatch) {
    try {
      const info = await axios.get(`${URL_COUNTRIES}?name=${name}`);

      return dispatch({
        type: SEARCH_COUNTRY_BY_NAME,
        payload: info.data,
      });
    } catch (error) {
      alert("Country not found");
      console.log(error);
    }
  };
}

/* 
nota: tratar de evitar logica en la actions . aca solo se despacha el tipo y
en el reducer o en el componnete va la logica

*/
export function filterCountriesByContinente(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function filterCountryByPopulation(payload) {
  return {
    type: FILTER_BY_POPULATION,
    payload,
  };
}

export function filterCountryByOrdenAZ(payload) {
  return {
    type: FILTER_BY_ORDEN_AZ,
    payload,
  };
}

export function filterByActivity(payload) {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload,
  };
}

//////============GET ACTIVITIES===========================
export function getActivities() {
  return async function (dispatch) {
    try {
      const info = await axios.get(`${URL_ACTIVITIES}`);
      return dispatch({
        type: GET_ACTIVITIES,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/*
OTRA FROMA DE HACER EL POST

export function postActivities(input) {
  return async function (dispatch) {
    try {
      await axios({
        url: `${URL_ACTIVITIES}`,
        method: "POST",
        data: input,
      });
      return dispatch({
        type: POST_ACTIVITIES,
        //payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
} */

export function postActivities(payload) {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/activities", payload);
      return dispatch({
        type: POST_ACTIVITIES,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//funcion para los creados por  createInDB

/* export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
} 
 */
