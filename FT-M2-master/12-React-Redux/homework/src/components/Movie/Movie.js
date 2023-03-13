import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getMovieDetail } from "../../actions/index";

import "./Movie.css";

class Movie extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  //aca no usamos useEffect
  componentDidMount() {
    //le debo pasar el id por params
    console.log(this.props); //para ver que llega
    this.props.getMoviesDetail(this.props.match.params.id);
  }

  render() {
    return (
      <Fragment>
        <div className="movie-detail">Detalle de la pelicula</div>;
        <h1>{this.props.MovieDetail.Title}</h1>
        <br></br>
        <img src={this.props.MovieDetail.Poster} />
        <h4>{this.props.MovieDetail.Genre}</h4>
        <h4>{this.props.MovieDetail.Director}</h4>
        <h4>{this.props.MovieDetail.Country}</h4>
        <h4>{this.props.MovieDetail.Released}</h4>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    MovieDetail: state.movieDetail,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMoviesDetail: (id) => dispatch(getMovieDetail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
