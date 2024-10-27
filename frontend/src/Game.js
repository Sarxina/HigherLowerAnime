// src/Game.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';

const Game = () => {
  // Move state variables inside the component
  const [currentAnime, setCurrentAnime] = useState(null);
  const [nextAnime, setNextAnime] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(100)

  // Define functions and hooks before the return statement
  const fetchAnime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/anime/random');
      return response.data;
    } catch (error) {
      console.error('Error fetching anime', error);
      return null;
    }
  };

  useEffect(() => {
    const startGame = async () => {
      const firstAnime = await fetchAnime();
      const secondAnime = await fetchAnime();
      setCurrentAnime(firstAnime);
      setNextAnime(secondAnime);
    };
    startGame();
  }, []);

  const handleGuess = async (guess) => {
    const isCorrect =
      (guess === 'higher' && nextAnime.rank < currentAnime.rank) ||
      (guess === 'lower' && nextAnime.rank > currentAnime.rank);

    if (isCorrect) {
      setScore(score + 1);
      setCurrentAnime(nextAnime);
      const newAnime = await fetchAnime();
      setNextAnime(newAnime);
    } else {
      setGameOver(true);
    }
  };

  const renderGameOver = () => (
    <div>
      <h2>Game Over!</h2>
      <p>Your final score is {score}.</p>
      {/* TODO: Add button to restart the game */}
    </div>
  );

  const renderGame = () => (
    <div>
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'absolute'
      }}>
        <div style={{ display: 'flex',
                      flexDirection: 'row',
                      width: '100vw',
                      height: '100vw' }}>
          {/* Left side: Current Anime */}
          <div>
            <AnimeCard rank={currentAnime.rank}
                      image={currentAnime.images.webp.large_image_url}
                      title={currentAnime.title_english} />
          </div>
          {/* Right side: Next Anime */}
          <div style={{
            display : 'flex',
            flexDirection : 'column-reverse',
            alignItems : 'column-reverse',
          }}>
            <div style={{position : 'absolute'}}>
              <AnimeCard rank={'???'}
                        image={nextAnime.images.webp.large_image_url}
                        title={nextAnime.title_english} />
            </div>
            <div style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexBasis: '33.33%',
            }}>
              <button onClick={() => handleGuess('higher')}>Higher</button>
              <button onClick={() => handleGuess('lower')}>Lower</button>
            </div>
          </div>
        </div>
      </div>
      {/* Div for things on top of game (score, buttons, difficulty) */}
      {/* <div style={{
        height: '100vw',
        width: '100vw',
        display : 'flex',
        flexDirection : 'column-reverse',
        alignItems : 'flex-end',
        position: 'absolute'
      }}>
        <div style={{

        }}>
          <button onClick={() => handleGuess('higher')}>Higher</button>
          <button onClick={() => handleGuess('lower')}>Lower</button>
        </div>
      </div> */}
    </div>
  );

  // Single return statement at the end
  return (
    <div>
      {gameOver
        ? renderGameOver()
        : !currentAnime || !nextAnime
        ? <div>Loading...</div>
        : renderGame()}
    </div>
  );
};

export default Game;

// Will get back to this
{/* <div>
<p>
  Is "{nextAnime.title_english}" ranked higher or lower than "{currentAnime.title_english}"?
</p>
<button onClick={() => handleGuess('higher')}>Higher</button>
<button onClick={() => handleGuess('lower')}>Lower</button>
</div> */}
