import React from 'react';

let style = {
  maxWidth: '300px',
  height: '500px',
  margin: '5px 20px',
  float: 'left',
};

let imgSpace = {
  width: '300px',
  height: '450px',
};

let word = {
  wordBreak: 'break-all',
};

const List = (props) => {
  return (
    <ul
      className='siimple-list'
      style={{ minHeight: props.movies.length * 300 + 'px' }}
    >
      {props.movies.map((movie, i) => (
        <li
          key={i}
          className='siimple-list-item siimple--bg-white'
          style={style}
        >
          <div style={word}>{movie.title}</div>
          <div style={imgSpace}>
            <img src={movie.poster_path} alt='' />
          </div>
          <p style={word}>評価:{movie.vote_average}</p>
          <p style={word}>公開:{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
