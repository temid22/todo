import React from 'react';
//import { redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {

  const [token, setToken] = useState(false);
  
  //const navigate = useNavigate();
 
  useEffect(() => {
    //setToken(getAuth());

    /*
    if(localStorage.session !== undefined) {
      let newToken = JSON.parse(localStorage.session).token
      setToken(newToken);
      return;
    }
    */
  
    const login = {
      email: prompt('Enter email:'),
      password: prompt('Enter password:')
    }
  
    console.log(login)
  
    fetch('http://localhost:8001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
      // initial server response
      .then(res => {
        console.log(res.status);
        if(res.status === 200) {
          return res.json()
        }
        console.log('not 200')
      })

      // processed server response
      .then(json => {
        console.log(json)
        if(json.token) {
          localStorage.setItem('session', JSON.stringify(json))
          console.log(localStorage.getItem('session'))
          //return json.token;   
          //setToken(json.token);
          return json.token;
        }
        if(json.status === 401) {
          console.log('401');
          //redirect("/login");
          //return false;
        }
        //return json
      })

      // catch errors
      .catch(error => {
        console.log(error)
      })
      
    //console.log('returned after getAuth()', getAuth())
  }, []);

  /*
  console.log(token);

  if(!token) {
    navigate("/login");
  }
  return children;
  */
}

export default ProtectedRoute;