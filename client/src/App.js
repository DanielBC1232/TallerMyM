/*
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import TrabajadorList from './components/TrabajadorList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/

import React from 'react';
import TrabajadorList from './components/TrabajadorList';
import AddTrabajador from './components/AddTrabajador';

const App = () => {
  return (
    <div>
      <h1>Gestión de Trabajadores</h1>
      <AddTrabajador />
      <TrabajadorList />
    </div>
  );
};

export default App;


