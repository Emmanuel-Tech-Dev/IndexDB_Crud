import React, { useState } from 'react';
import { insertData } from '../hooks/indexDb/indexFunctions';

const Form = () => {
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
  const [data, setData] = useState({
    name : '',
    message : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    insertData(data);
    setData({
        name: '',
        message : ''
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        placeholder='Enter name'
        value={data.name}
        onChange={handleChange}
      />
      <textarea
        placeholder='Enter message'
        value={data.message}
        name='message'
        onChange={handleChange}
      ></textarea>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;