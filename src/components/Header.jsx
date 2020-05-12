import React from 'react';

let style = {
  cursor: 'pointer',
};

let smallWord = {
  fontSize: '14px',
  margin: '0px 20px',
};

const Header = () => {
  return (
    <div>
      <h1 className='siimple-box-title siimple--color-white top_h'>
        Search Cinema
        <span style={smallWord}>- 映画を楽しもう - </span>
      </h1>
    </div>
  );
};

export default Header;
