import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import AnimeCard from './AnimeCard';
import Game from './Game';
import axios from 'axios'

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
