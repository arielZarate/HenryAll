import {
  ADD_MOVIE_FAVORITE,
  GET_MOVIES,
  GET_MOVIES_DETAIL,
  REMOVE_MOVIE_FAVORITE,
} from "../actions-types";

const initialState = {
  moviesFavorites: [],
  moviesLoaded: [],
  movieDetail: {},
};

/* 
Tienes que crear los 4 reducers para las 4 acciones que creamos anteriormente que son:
getMovies, getMovieDetail, removeMovieFavorite,addMovieFavorite

*/
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        moviesLoaded: action.payload.Search,
      };

    case GET_MOVIES_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case ADD_MOVIE_FAVORITE:
      return {
        ...JSON.parse(JSON.stringify(state)),
        moviesFavorites: [
          ...JSON.parse(JSON.stringify(state.moviesFavorites)),
          action.payload,
        ], //
        //state.moviesFavorites.concat(action.payload),
      };

    case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavorites: state.moviesFavorites.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default rootReducer;
