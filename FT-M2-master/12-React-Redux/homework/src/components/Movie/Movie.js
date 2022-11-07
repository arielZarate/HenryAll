import React from "react";
import { connect } from "react-redux";
import { getMovieDetail } from "../../actions/index";

import "./Movie.css";

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMovieDetail();
  }
  render() {
    return (
      <div className="movie-detail">
        <h1>{this.props.movieDetail.Title}</h1>
        <p>{this.props.movieDetail.Year}</p>
        <img src={this.props.movieDetail.Poster} alt="peli" />
        <p>{this.props.movieDetail.Plot}</p>
      </div>
    );
  }
}

//agregando code

const mapStateToProps = (state) => {
  return { movieDetails: state.MovieDetail };
};
const mapDispatchToProps = (dispatch) => {
  return;
  {
    movieDetails: (id) => dispatch(movieDetail(id));
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
