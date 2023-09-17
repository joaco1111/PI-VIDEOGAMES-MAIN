import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const apiUrl = 'http://localhost:3001';

fetch(`${apiUrl}/videogames`)
  .then((response) => response.json())
  .then((data) => {// Procesa los datos recibidos del backend.
  })
  .catch((error) => {// Maneja los errores de la solicitud.
  });
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
