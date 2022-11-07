import React, { Component } from "react";
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
  handleSubmit(event) {
    event.preventDefault();
    //esto agrego
    this.props.getMovies(this.state.title);
  }
  //evento click
  handlerClick(movie) {
    this.props.addMovieFavorite(movie);
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
        <ul>
          {
            /* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */

            this.props.movies.map((movie) => {
              return (
                <li>
                  <Link to={`/movie/${movie.imdbID}`}>
                    <span>{movie.Title}</span>
                  </Link>
                  <button onClick={this.handlerClick({ id: movie.imdbID })}>
                    Favorite💥
                  </button>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

/* const mapDispatchToProps=(dispatch)=>{
  getMovies:titulo=>dispatch(getMovies(titulo)),
  getMovieDetail:id=>dispatch(getMovieDetail(id)),

}
 */
export default Buscador;
