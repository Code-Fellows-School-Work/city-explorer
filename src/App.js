import { useState } from 'react'

import axios from 'axios';

import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 class = 'main-heading'>City Explorer</h1>
    </div>
  );
}

export default App;
