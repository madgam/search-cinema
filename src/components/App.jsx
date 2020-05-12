import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movies: [],
      count: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleAdd(e) {
    if (this.state.query.length === 0) return;

    this.setState({ movies: [] });

    e.preventDefault();
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ja-JP&query=${this.state.query}&page=1&include_adult=false`,
      { mode: 'cors' }
    )
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const cinemas = myJson.results;
        console.log(cinemas);
        cinemas.forEach((e) => {
          let cinema = {};
          const poster_path = e.poster_path
            ? `https://image.tmdb.org/t/p/w300_and_h450_face${e.poster_path}`
            : null;
          const backdrop_path = e.backdrop_path
            ? `https://image.tmdb.org/t/p/w1000_and_h563_face${e.backdrop_path}`
            : null;

          cinema.title = e.title;
          cinema.poster_path = poster_path;
          cinema.droppath = backdrop_path;
          cinema.vote_average = (
            Math.floor(e.vote_average / 2 / 0.5) * 0.5
          ).toFixed(1);
          cinema.release_date = e.release_date;

          this.setState((state) => ({ movies: state.movies.concat(cinema) }));
        });
        this.setState({ count: this.state.movies.length });
      });
  }

  render() {
    return (
      <div className='siimple-box siimple--bg-dark'>
        <Header />
        <Form
          onSubmit={this.handleAdd}
          handleChange={this.handleChange}
          count={this.state.count}
        />
        <div className='siimple-rule'></div>
        <List movies={this.state.movies} />
      </div>
    );
  }
}
