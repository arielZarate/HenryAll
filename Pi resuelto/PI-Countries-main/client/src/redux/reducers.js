/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {
  GET_COUNTRIES,
  SEARCH_COUNTRY_BY_NAME,
  FILTER_BY_CONTINENT,
  FILTER_BY_POPULATION,
  FILTER_BY_ORDEN_AZ,
  FILTER_BY_ACTIVITIES,
  GET_ACTIVITIES,
  POST_ACTIVITIES,
  GET_DETAIL,
} from "./types_actions";

const initialState = {
  countries: [],
  countries_copia: [],
  activities: [],
  detail: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // get countries
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countries_copia: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case SEARCH_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    //ES UN SOLO ESTADO PARA TODO Y DE ACUERDO A LO QUE LLEGUE EN EL PAYLOAD IRA RENDERIZANDO
    case FILTER_BY_CONTINENT:
      //lo hago desde el stste copia para que luego no se pise con el array original
      const allCountries = state.countries_copia;
      // eslint-disable-next-line no-unused-vars
      const ContinentFiltered =
        action.payload == "All"
          ? allCountries
          : allCountries.filter((c) => c.continents === action.payload);
      return {
        ...state, //siempre devuelvo el estado anterior mas lo que paso..
        countries: ContinentFiltered,
      };
    //////////////////////////////////////////////////////////////////////
    /* ortden de poblacion */
    /*    case FILTER_BY_POPULATION:
      //declaor un array
      let sortPopulation =
        action.payload === "mayor"
          ? state.countries.sort((a, b) => {
              if (a.population < b.population) {
                return 1;
              }
              if (a.population > b.population) {
                return -1;
              }
            })
          : state.countries.sort((a, b) => {
              if (a.population < b.population) {
                return -1;
              }
              if (a.population > b.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortPopulation,
      }; */

    case FILTER_BY_POPULATION:
      let orderCountriesByPopulation =
        action.payload === "mayor"
          ? state.countries.sort((a, b) => {
              if (a.population < b.population) {
                return 1;
              }
              if (a.population > b.population) {
                return -1;
              }
            })
          : state.countries.sort((a, b) => {
              if (a.population < b.population) {
                return -1;
              }
              if (a.population > b.population) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        countries: orderCountriesByPopulation,
      };
    ///////////////////////////////////////////
    /* orden de a a z */
    case FILTER_BY_ORDEN_AZ:
      const sortOrden =
        action.payload === "a-z"
          ? state.countries.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              } else {
                return 0;
              }
            })
          : state.countries.sort((a, b) => {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        countries: sortOrden,
      };
    //============ACTIVBITIES====================
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    /*  case FILTER_BY_ACTIVITIES:
      const continentFilteredByActivities = state.countries.filter((c) => {
        return c.activities.find((a) => {
          return a.name === action.payload;
        });
      });
      if (action.payload === "todos") {
        return {
          ...state,
          countries: state.countries,
        };
      } else {
        return {
          ...state,
          countries: continentFilteredByActivities,
        };
      }
 */

    case FILTER_BY_ACTIVITIES: {
      const filtredCountriesByActivities = state.countries.Activities;
      console.log("filtro\n", filtredCountriesByActivities);
      const continentFilteredBA = filtredCountriesByActivities.filter((c) => {
        return c.activities.find((c) => {
          return c.name === action.payload;
        });
      });

      if (action.payload === "todos") {
        return { ...state, countries: filtredCountriesByActivities };
      } else {
        return {
          ...state,
          countries: continentFilteredBA,
        };
      }
    }

    case POST_ACTIVITIES:
      return {
        ...state,
      };

    /* 
    /////////////////////////////////////////////////
    //CASO DE FILTRO POR CREATEDINDB
    case "FILTER_CREATED": {
      const allCountries2 = state.countries_copia;
      const createdFilter =
        action.payload == "created"
          ? allCountries2.filter((c) => c.createInDB)
          : allCountries2.filter((c) => !c.createInDB);
      return {
        ...state,
        countries: action.payload === "All" ? state.countries : createdFilter,
      };
    } */

    default:
      return state;
  }
};
