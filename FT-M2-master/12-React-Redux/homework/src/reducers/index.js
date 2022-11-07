import {
  ADD_MOVIE_FAVORITE,
  GET_MOVIES,
  REMOVE_MOVIE_FAVORITE,
  GET_MOVIES_DETAILS,
} from "../actions/action-types";

const initialState = {
  movies: [],
  movies_favorites: [],
  movies_details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,

        //el Search es una propiedad de la api
        movies: action.payload.Search,
      };

    case ADD_MOVIE_FAVORITE:
      return {
        ...state,
        //creo un nuevo array porque son datos dsintintos
        movies_favorites: [...state.movies_favorites, action.payload],
      };
    case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        movies_favorites: state.movies_favorites.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    case GET_MOVIES_DETAILS:
      return { ...state, movies_details: action.payload };

    //DEFAULT
    default:
      return { ...state };
  }
}
