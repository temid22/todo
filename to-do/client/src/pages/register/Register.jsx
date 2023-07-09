import React, { useState } from 'react';
import './register.css';
import Navbar from '../../components/navbar/Navbar';

const Register = () => {
  //  declare the states to collect data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Submit data to register function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //check if email and password fields are not empty
      if ((email !== '') & (password !== '')) {
        fetch('http://localhost:8001/api/auth/register', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => {
            console.log(res);
            // check the response if it is 200/successfull
            if (res.status === 201) {
              console.log('json');
              return res.json();
            } else {
              console.log('no json');
              return res.msg;
            }
          })
          .then((res) => {
            console.log(res);
            window.location.pathname = '/login';
          });
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='registerContainer'>
        <div className='regTitle'>Register</div>
        <div className='registerWrapper'>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='text'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label>Password</label>
            <input
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button type='submit'>Sign Up</button>
          </form>
          {error && <div>Invalid Parameters... Input a valid email/gmail</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
