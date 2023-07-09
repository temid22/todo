import React, { useState } from 'react';
import './login.css';

import Navbar from '../../components/navbar/Navbar';

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // submit login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = {
      email,
      password,
    };

    try {
      fetch('http://localhost:8001/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(login),
      })
        // initial server response
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            return res.statusText;
          }
        })

        // processed server response
        .then((json) => {
          console.log(json, 'data');
          if (json.accessToken) {
            localStorage.setItem('session', JSON.stringify(json));
            console.log(localStorage.getItem('session'));
            setAuth(json.accessToken);
            setTimeout(() => {
              window.location.pathname = '/tasks';
            }, 300);
          }
        });

      // catch errors
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div>
      <Navbar />
      <div className='registerContainer'>
        <div className='regTitle'>Login</div>
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
              type='text'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button type='submit'>Login</button>
          </form>
          {error && <div>Invalid Parameters!</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
