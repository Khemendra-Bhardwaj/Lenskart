
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Lol ! ');

  // useEffect(() => {
  //   // Replace with your backend's URL
  //   axios.get('http://localhost:4000/getSomething')
  //     .then((response) => {
  //       setMessage(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1> {message} </h1>
      <p> Hi </p>
      
    </div>
  );
}

export default App;
