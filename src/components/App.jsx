import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import List from './List';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: '',
      movies: [],
      query: '',
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
    const queryParam = {
      api_key: TMDB_API_KEY,
      language: 'ja-JP',
      query: this.state.query,
      page: '1',
      include_adult: 'false',
    };

    const url =
      `https://api.themoviedb.org/3/search/movie?` +
      new URLSearchParams(queryParam);

    axios
      .get(url)
      .then((results) => {
        const cinemas = results.data.results;
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
      })
      .catch(() => {
        this.setState({ message: '通信に失敗しました。' });
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
        <b style={{ color: 'red' }}>{this.state.message}</b>
      </div>
    );
  }
}
