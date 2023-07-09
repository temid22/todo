import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ToDo from './components/ToDo';
import Home from './pages/Home';

const App = () => {
  // check for user and admin
  const user = JSON.parse(localStorage.getItem('session'));
  const auth = user?.accessToken;

  return (
    <>
      {/* Routes rendered dynamically and protected */}
      <Routes>
        <Route
          path='/register'
          element={auth ? <Navigate exact to='/tasks' /> : <Register />}
        />
        <Route
          path='/login'
          element={auth ? <Navigate exact to='/tasks' /> : <Login />}
        />
        <Route
          path='/tasks'
          element={!auth ? <Navigate exact to='/login' /> : <ToDo />}
        />
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
