import React from 'react';

let inputField = {
  margin: '0px 15px',
};

let btn = {
  minWidth: '100px',
};

let count = {
  margin: '0px 20px',
};

const Form = (props) => {
  return (
    <form className='siimple-form' onSubmit={props.onSubmit}>
      <div className='siimple-form-field'>
        <label className='siimple-label siimple--color-white'>TitleName:</label>
        <input
          name='title'
          style={inputField}
          type='text'
          className='siimple-input'
          onChange={props.handleChange}
        />
        <input
          type='submit'
          style={btn}
          value='Get'
          className='siimple-btn siimple-btn--teal'
        />
        <span className='siimple-label siimple--color-white' style={count}>
          {props.count}件
        </span>
      </div>
    </form>
  );
};

export default Form;
