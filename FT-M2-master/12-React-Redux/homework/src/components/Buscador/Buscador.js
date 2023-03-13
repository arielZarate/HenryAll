import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import {
  getMovies,
  getMovieDetail,
  addMovieFavorite,
} from "../../actions/index";

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  //MENEJADOR DEL BOTON ENVIAR
  handleSubmit(event) {
    event.preventDefault();
    // como es clases uso el this.props
    this.props.Movies(this.state.title);
  }

  //MENEJADOR DE ON-CLIKC

  handlerClick(movie) {
    this.props.addMovieFavorite(movie);
  }

  handlerMoviesFavorites(imdbID) {
    return this.props.favorites.find((fav) => fav.id === imdbID) ? true : false;
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">
              Película:{" "}
            </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>

        {/* 
        
         
        
        
        <Link to={`/movie/${movie.imdbID}`}>
                <span>{movie.Title}</span>
              </Link> */}
        <ul>
          {this.props.movies.map((movie) => {
            return (
              <li key={movie.imdbID}>
                {/* aca navego a la ruta del detalle */}

                <Link to={`/movie/${movie.imdbID}`}>
                  {" "}
                  <span>{movie.Title}</span>
                </Link>
                <button
                  onClick={() =>
                    this.props.addFavorite({
                      title: movie.Title,
                      id: movie.imdbID,
                    })
                  }
                >
                  {this.handlerMoviesFavorites(movie.imdbID) ? "❤" : "🤍"}
                </button>

                <br></br>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  //============
}

//carga los state del reducer
function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,
    favorites: state.moviesFavorites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Movies: (title) => dispatch(getMovies(title)),
    addFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    movieDetail: (id) => dispatch(getMovieDetail(id)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
